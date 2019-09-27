import React, { Component } from 'react';
import { connect } from 'react-redux';
import { add, final, setCurrent } from './action';

class Calculator extends Component {
  state = {
    operator_added: false,
    calculate: false
  };

  insertNumber = value => {
    if (!this.props.data.current_value && value === '0') {
      return;
    }
    if (this.state.operator_added) {
      this.props.setCurrent(value);
      this.props.add(this.props.data.value + value);
      this.setState({
        operator_added: false,
        calculate: true
      });
    }

    if (!this.state.operator_added) {
      this.props.add(this.props.data.value + value);
      this.props.setCurrent(this.props.data.value + value);
      this.setState({
        calculate: true
      });
    }
  };

  percentage = () => {
    const finalValue = this.props.data.final;
    if (isNaN(finalValue) || this.state.operator_added) {
      return;
    }
    if (finalValue === 0) {
      this.props.final(this.props.data.current_value / 100);
      this.props.add(this.props.data.current_value / 100);

      this.props.setCurrent(this.props.data.current_value / 100);
    } else {
      this.props.add(eval(this.props.data.value) / 100);
      this.props.final(eval(this.props.data.value) / 100);
      this.props.setCurrent(eval(this.props.data.value) / 100);
    }
  };

  operator = value => {
    if (this.state.operator_added && value === '+') {
      return;
    }
    if (this.state.operator_added && value === '/') {
      return;
    }
    if (this.state.operator_added && value === '%') {
      return;
    }
    if (this.state.operator_added && value === '*') {
      return;
    }
    if (this.state.operator_added && value === '.') {
      return;
    }
    if (this.state.operator_added && value === '-') {
      return;
    }

    if (!this.props.data.current_value && value === '+') {
      return;
    }
    if (!this.props.data.current_value && value === '/') {
      return;
    }
    if (!this.props.data.current_value && value === '%') {
      return;
    }
    if (!this.props.data.current_value && value === '*') {
      return;
    }

    const finalValue = parseInt(this.props.data.current_value);

    if (!this.state.calculate) {
      this.props.final(finalValue);
    }

    if (this.state.calculate) {
      this.props.final(this.props.data.final + finalValue);
    }

    this.props.add(this.props.data.value + value);
    this.setState({
      operator_added: true,
      calculate: false
    });
  };

  clearNumber = () => {
    this.props.add('');
    this.props.setCurrent('');
    this.props.final(0);
    this.setState({
      current_number: '',
      operator_added: false
    });
  };

  calculate = () => {
    if (!this.props.data.current_value) {
      return;
    }
    if (!this.state.calculate) {
      return;
    }

    this.setState({
      operator_added: false,
      calculate: false
    });

    this.props.add(eval(this.props.data.value));
    this.props.final(eval(this.props.data.value));
    this.props.setCurrent(eval(this.props.data.value));
  };

  render() {
    return (
      <div className="calc-wrapper">
        <p className="view-calculation">{this.props.data.value}</p>
        <div className="current-calculation">
          <p>{this.props.data.current_value && '='}</p>
          <p>{this.props.data.current_value}</p>
        </div>
        <div className="numpad-wrapper">
          <div className="btn-clear">
            <button onClick={this.clearNumber}>CLEAR</button>
            <button onClick={() => this.operator('*')}>x</button>
          </div>
          <div className="btn-main">
            <button onClick={() => this.insertNumber('1')}>1</button>
            <button onClick={() => this.insertNumber('2')}>2</button>
            <button onClick={() => this.insertNumber('3')}>3</button>
            <button onClick={() => this.operator('+')} className="color-yellow">
              +
            </button>
            <button onClick={() => this.insertNumber('4')}>4</button>
            <button onClick={() => this.insertNumber('5')}>5</button>
            <button onClick={() => this.insertNumber('6')}>6</button>
            <button className="color-yellow" onClick={() => this.operator('-')}>
              -
            </button>
            <button onClick={() => this.insertNumber('7')}>7</button>
            <button onClick={() => this.insertNumber('8')}>8</button>
            <button onClick={() => this.insertNumber('9')}>9</button>
            <button onClick={this.percentage} className="color-yellow">
              %
            </button>
            <button onClick={() => this.operator('/')} className="color-yellow">
              /
            </button>
            <button onClick={() => this.insertNumber('0')}>0</button>
            <button onClick={() => this.operator('.')} className="color-yellow">
              .
            </button>
            <button onClick={this.calculate} className="color-yellow">
              =
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state
  };
};

export default connect(
  mapStateToProps,
  { add, final, setCurrent }
)(Calculator);
