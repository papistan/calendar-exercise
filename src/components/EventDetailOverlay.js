import React, {PureComponent, PropTypes} from 'react';
import {EVENT_PROP_TYPE} from './constants';
import {getDisplayDate, getDisplayHour} from '../utils';

import './EventDetailOverlay.css';

export default class EventDetailOverlay extends PureComponent {
    static propTypes = {
        event: EVENT_PROP_TYPE.isRequired,
        onClose: PropTypes.func.isRequired
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
        document.removeEventListener('keyup', this.handleKeyUp);
    }

    handleKeyUp = (e) => {
        if(e.keyCode === 27) {
            this.props.onClose();
        }
    }

    handleClick = (e) => {
        if(this.node.contains(e.target)) {
            return
        }
        this.props.onClose();
    }
    

    render() {
        let {event, onClose} = this.props;
        let {title, description, start, color, hours} = event;
        let displayDate = getDisplayDate(start);
        let startHour = (new Date(start)).getHours();

        // TODO: Fix. If hours was other than 1 the UI would break
        let endHour = startHour + hours;

        let startHourDisplay = getDisplayHour(startHour);
        let endHourDisplay = getDisplayHour(endHour);

        let displayDateTime = `${displayDate} ${startHourDisplay} - ${endHourDisplay}`;

        
        return (
            <div 
                role="dialog" 
                aria-labelledby="dialog1Title" 
                aria-describedby="dialog1Desc"
                ref={node => this.node = node}>
                <section className="event-detail-overlay">
                    <div className="event-detail-overlay__container">
                        <button
                            className="event-detail-overlay__close"
                            title="Close detail view"
                            onClick={onClose}
                        />
                        <div title="Display date">
                            {displayDateTime}
                            <span
                                className={`event-detail-overlay__color ${color}`}
                                title={`Event label color: ${color}`}
                            />
                        </div>
                        <h1 
                            className="event-detail-overlay__title"
                            title="Display event title"
                            id="dialog1Title"
                        >
                            {title}
                        </h1>
                        <p 
                            title="Display description:"
                            id="dialog1Desc"
                        >
                            {description}
                        </p>
                    </div>
                </section>
            </div>
        );
    }
}
