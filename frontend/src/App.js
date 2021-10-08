//Importing router from React Router DOM for setting up the react router
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';
import Header from './component/layout/Header';
import { Home } from './component/layout/Home';
import { RegisterSupplier } from './component/layout/RegisterSupplier';
import  { RegisterSuppliedItem }  from './component/layout/RegisterSuppliedItem';
import { RegisterSupply } from './component/layout/RegisterSupply';
import { UpdateSuppliedItem } from './component/layout/UpdateSuppliedItem';
import { UpdateSupplier } from './component/layout/UpdateSupplier';
import { UpdateSupply } from './component/layout/UpdateSupply';
import Footer from './component/layout/Footer';
import Admin_nav from './component/layout/AdminNav';
import { AllSuppliedItems } from './component/layout/AllSuppliedItems'
import { AllSuppliers } from './component/layout/AllSuppliers'
import { AllSupplies } from './component/layout/AllSupplies'

function App() {
  return (
    <Router>
    <div className="App">
      <Header />

      <br /><br />

      {/* Routes */}
      <Route path = "/" component={Home} exact />
      <Route path = "/register_supplied_item" component={RegisterSuppliedItem} exact />
      <Route path = "/register_supplier" component={RegisterSupplier} exact />
      <Route path = "/register_supply" component={RegisterSupply} exact />
      <Route path = "/update_supplied_item/update/:id" component={UpdateSuppliedItem} exact />
      <Route path = "/update_supplier/update/:id" component={UpdateSupplier} exact />
      <Route path = "/update_supply" component={UpdateSupply} exact />
      <Route path = "/all_supplied_items" component={AllSuppliedItems} exact />
      <Route path = "/all_suppliers" component={AllSuppliers} exact />
      {/* <Route path = "/all_suppliers/search/:keyword" component={AllSuppliers} exact /> */}
      <Route path = "/all_supplies" component={AllSupplies} exact />
      {/* <Route path = "/all_supplies/search/:keyword" component={AllSupplies} exact /> */}
      <Route path = "/search/:keyword" component={AllSuppliedItems} exact />
      <Route path = "/search2/:keyword2" component={AllSuppliers} exact />
      <Route path = "/search3/:keyword3" component={AllSupplies} exact />
      <Route path = "/all_suppliers/after_deletion" component={AllSuppliers} exact />

      <Footer />
    </div>
    </Router>
  );
}

export default App;
