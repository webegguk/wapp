import React, {Component} from 'react';
import {DateRangePicker} from 'react-dates';
import '../App.css';
import 'react-dates/lib/css/_datepicker.css';

class Datepicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            focusedInput: null,
            daysSet: false,
            daysBetween: null
        };
    }

    onDatesChange({startDate, endDate, daysSet, daysBetween}) {
        if (endDate != null) {
            daysSet = true;
            daysBetween = Math.floor(( Date.parse(endDate) - Date.parse(startDate) ) / 86400000);
        }
        this.setState({startDate, endDate, daysSet, daysBetween});
    }

    onFocusChange(focusedInput) {
        this.setState({focusedInput});
    }
    render() {
        const daysSet = this.state.daysSet;
        let message = null;
        if (daysSet) {
            message = <p>{this.state.daysBetween} days between</p>
        } else {
            message = ''
        }
        return (
            <div className="App">
                <DateRangePicker
                    withFullScreenPortal={true}
                    numberOfMonths={2}
                    orientation={"vertical"}
                    isOutsideRange={() => false}
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    onDatesChange={this.onDatesChange.bind(this)} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={this.onFocusChange.bind(this)} // PropTypes.func.isRequired,
                />
                <div className="App-days">
                    {message}
                </div>
            </div>
        );
    }
}

export default Datepicker;