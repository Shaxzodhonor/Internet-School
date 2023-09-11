import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Files from '../pages/Files';
import Position from '../pages/Position';
import News from '../pages/News';
import Partners from '../pages/Partners';
import Sections from '../pages/Sections';
import Statistics from '../pages/Statistics';
import Header from './Header';
import Menu from './Menu';
import Subjects from '../pages/Subjects';
import Employee from '../pages/Employee';
import Direction from '../pages/Direction';
import Events from '../pages/Events';
import Government from '../pages/Government';
import Acceptance from '../pages/Acceptance';
import School from '../pages/School';
import Contact from '../pages/Contact';

const Dashboard = () => {
  return (
    <div className='d-flex flex-column' style={{height: "100vh"}}>
      <Header />
      <div className="flex-grow-1" style={{ overflow: "hidden"}}>
        <div className='d-flex h-100' >
          <Menu />
          <div className='flex-grow-1 h-100 p-3' style={{ overflow: "auto"}}>
            <Switch>
              <Route path={"/statistics"} exact component={Statistics} />
              <Route path={"/sections"} component={Sections} />
              <Route path={"/school"} component={School} />
              <Route path={"/acceptance"} component={Acceptance} />
              <Route path={"/partners"} component={Partners} />
              <Route path={"/government"} component={Government} />
              <Route path={"/contact"} component={Contact} />
              <Route path={"/news"} component={News} />
              <Route path={"/events"} component={Events} />
              <Route path={"/files"} component={Files} />
              <Route path={"/position"} component={Position} />
              <Route path={"/subject"} component={Subjects} />
              <Route path={"/employee"} component={Employee} />
              <Route path={"/direction"} component={Direction} />
            </Switch>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default Dashboard;