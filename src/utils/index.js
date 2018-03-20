/**
 * Given a list of events and a date, filter the events down to those that
 * fall on the same day as the date
 * @param {array} events - List of event objects
 * @param {Date} timestamp - The timestamp representing the day to match
 * @returns {array}
 */
export const filterEventsByDay = (events, timestamp) => {

    let selectedDate = new Date(timestamp);
    let selectedDateStart = selectedDate.setHours(0,0,0,0);
    let selectedDateEnd = selectedDate.setHours(23,59,59,999);

    let todaysEvents = events.filter( event => 
        event.start > selectedDateStart && event.start < selectedDateEnd 
    );
    return todaysEvents;
}

/**
 * Given a list of events and an hour number, filter the events down to those that
 * start on the specified hour
 * @param {array} events - List of event objects
 * @param {number} hour - The hour to match (0 - 23)
 * @param {array}
 * @returns {array}
 */
export const filterEventsByHour = (events, hour) => (
    events.filter(({start}) => (
        new Date(start)).getHours() === hour
    )
);

/**
 * Given a numerical timestamp, returns the formatted date string w/o time component
 * @param {number} timestamp - The date to format
 * @returns {string} The formatted date
 */
export const getDisplayDate = (timestamp) => {
    let selectedDate = new Date(timestamp);
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return selectedDate.toLocaleDateString('en-US', options);
};

/**
 * Given an hour number, returns a display string version
 * @param {number} hour - The hour
 * @returns {string}
 */

export const getDisplayHour = (hour) => {
    let ampm = hour > 11 ? 'PM' : 'AM';
    let hourNumber = (_hour) => {
        if (_hour == 0 || _hour == 12 ) {
           return 12
        } else if ( _hour < 12 ) {
           return _hour;
        } else {
           return _hour - 12;
        }
    };

    return (hourNumber(hour) + ampm).toString();
}

 
/**
 * Given a list of events, returns the event object whose id matches the specified eventId
 * @param {array} events - List of event objects
 * @param {number} eventId - ID of event to find
 * @returns {object}
 */
export const getEventFromEvents = (events, eventId) => (
    events.find(({id}) => id === eventId)
);

export const getAdjacentDay = (currentTimestamp, offset) => {
    let today = new Date(currentTimestamp);
    let currentDate = today.getDate();
    let offsetDate = offset === 'tomorrow' ? currentDate + 1 : currentDate - 1;
    let nextTimestamp = today.setDate(offsetDate);

    return nextTimestamp;
}