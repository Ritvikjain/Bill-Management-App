import React, { Component } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import billData from './config/BillData.json'
import { updateBills } from "./redux/actions/BillDataActions";
import { updateBillData } from "./functions/BillFunctions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import 'antd/dist/antd.css';
import MonthlyCycle from "./components/MonthlyCycle/MonthlyCycle";
import MonthlyBudget from "./components/MonthlyBudget/MonthlyBudget";
class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    if(this.props.bills.length == 0)
      updateBillData(billData.bills)
  }
  render() {
    return(
      <div className="container-fluid p-0">
        <Router>
          <Navbar></Navbar>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path="/monthlycycle">
              <MonthlyCycle></MonthlyCycle>
            </Route>
            <Route exact path="/monthlybudget">
              <MonthlyBudget/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    bills: state.billsData.bills,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    
  }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(App);
