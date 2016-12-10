import Drop from 'tether-drop';

import classlist from '../helpers/classlist';
import ReceivesTargetedEvent from './ReceivesTargetedEvent';

export default {
    props: {
        id: String,
        trigger: {
            type: [Element, Function],
        },
        containFocus: {
            type: Boolean,
            default: true
        },
        dropdownPosition: {
            type: String,
            default: 'bottom left'
        },
        openOn: {
            type: String,
            default: 'click' // 'click', 'hover', 'focus', 'always'
        }
    },

    data() {
        return {
            drop: null,
            lastFocussedElement: null,
            currentTrigger: null,
        };
    },

    mounted() {
        for(let event of ['open','close','toggle']){
            this.$on('ui-dropdown::'+event, this['ui-dropdown::'+event]);
        }
        this.$nextTick(() => {
            this.initializeDropdown(this.triggerComputed);
        });
    },

    beforeDestroy() {
        this.destroyDropdown();
        for(let event of ['open','close','toggle']){
            this.$off('ui-dropdown::'+event, this['ui-dropdown::'+event]);
        }
    },
    
    computed: {
        triggerComputed() {
            if(this.trigger instanceof Function){
                return this.trigger();
            } else {
                return this.trigger;
            }
        }
    },

    methods: {
        'ui-dropdown::open' (id) {
            // Abort if event isn't meant for this component
            if (!this.eventTargetsComponent(id)) {
                return;
            }

            this.openDropdown();
        },

        'ui-dropdown::close' (id) {
            // Abort if event isn't meant for this component
            if (!this.eventTargetsComponent(id)) {
                return;
            }

            this.closeDropdown();
        },

        'ui-dropdown::toggle' (id) {
            // Abort if event isn't meant for this component
            if (!this.eventTargetsComponent(id)) {
                return;
            }

            this.toggleDropdown();
        },

        initializeDropdown(el) {
            if(el !== this.currentTrigger) {
                this.destroyDropdown()
            } else return;
            
            console.log('initializeDropdown ', el, this.$refs.dropdown);
            if(!el || !this.$refs || !this.$refs.dropdown) return;

            this.currentTrigger = el;
            
            this.drop = new Drop({
                target: el,
                content: this.$refs.dropdown,
                position: this.dropdownPosition,
                constrainToWindow: true,
                openOn: this.openOn
            });

            console.log(this.drop);

            // TO FIX: Hacky workaround for Tether not positioning
            // correctly for positions other than 'bottom left'
            if (this.dropdownPosition !== 'bottom left') {
                this.drop.open();
                this.drop.close();
                this.drop.open();
                this.drop.close();
            }

            this.drop.on('open', this.positionDrop);
            this.drop.on('open', this.dropdownOpened);
            this.drop.on('close', this.dropdownClosed);
        },

        destroyDropdown() {
            if (this.drop) {
                this.drop.remove();
                this.drop.destroy();
            }
            this.currentTrigger = null;
        },

        openDropdown() {
            if (this.drop) {
                this.drop.open();
            }
        },

        /**
         * Ensures drop is horizontally within viewport (vertical is already solved by drop.js).
         * https://github.com/HubSpot/drop/issues/16
         */
        positionDrop() {
            const drop = this.drop;
            const windowWidth = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;

            let dropWidth = drop.drop.getBoundingClientRect().width;
            let left = drop.target.getBoundingClientRect().left;
            let availableSpace = windowWidth - left;

            if (dropWidth > availableSpace) {
                let direction = dropWidth > availableSpace ? 'right' : 'left';

                drop.tether.attachment.left = direction;
                drop.tether.targetAttachment.left = direction;

                drop.position();
            }
        },

        closeDropdown() {
            if (this.drop) {
                this.drop.close();
            }
        },

        toggleDropdown(e) {
            if (this.drop) {
                this.drop.toggle(e);
            }
        },

        dropdownOpened() {
            classlist.add(this.trigger, 'dropdown-open');

            this.lastFocussedElement = document.activeElement;
            this.$refs.dropdown.focus();

            this.$emit('dropdown-opened');
        },

        dropdownClosed() {
            classlist.remove(this.trigger, 'dropdown-open');

            if (this.lastFocussedElement) {
                this.lastFocussedElement.focus();
            }

            this.$emit('dropdown-closed');
        }
    },

    mixins: [
        ReceivesTargetedEvent
    ]
};
