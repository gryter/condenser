import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class HelpTip extends React.Component {
    static propTypes = {
        children: PropTypes.any.isRequired,
        content: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
            .isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    show = () => this.setVisibility(true);
    hide = () => this.setVisibility(false);

    setVisibility = visible => {
        this.setState(
            Object.assign({}, this.state, {
                visible,
            })
        );
    };

    handleTouch = () => {
        this.show();
        this.assignOutsideTouchHandler();
    };

    assignOutsideTouchHandler = () => {
        const handler = e => {
            let currentNode = e.target;
            const componentNode = ReactDOM.findDOMNode(this.refs.instance);
            while (currentNode.parentNode) {
                if (currentNode === componentNode) return;
                currentNode = currentNode.parentNode;
            }
            if (currentNode !== document) return;
            this.hide();
            document.removeEventListener('touchstart', handler);
        };
        document.addEventListener('touchstart', handler);
    };

    render() {
        const { props, state, show, hide, handleTouch } = this;
        return (
            <div
                onMouseEnter={show}
                onMouseLeave={hide}
                onTouchStart={handleTouch}
                ref="helptip-wrapper"
                className="helptip-wrapper"
            >
                {props.children}
                {state.visible && (
                    <div ref="helptip" className="helptip">
                        <div ref="helptip-content" className="helptip__content">
                            {props.content}
                        </div>
                        <div ref="helptip-arrow" className="helptip__arrow" />
                        <div ref="helptip-gap" className="helptip__gap" />
                    </div>
                )}
            </div>
        );
    }
}
