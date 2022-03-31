import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ReportDoanhThu extends Component {
  
  componentDidMount() {
    const scripts = [
      
  ];
  const scripttag = document.getElementById("tagscripts");
  scripttag.innerHTML = '';
  scripts.forEach(s => {
    const script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = s;
    script.async = true
    scripttag.appendChild(script);
  })

    
  }
  render () {
    

    return (
        <div>
        <div className="row">
          <div className="col-lg-3 col-sm-3 col-xs-12">
            <div className="white-box analytics-info">
              <h3 className="box-title">Total Income</h3>
              <ul className="list-inline two-part">
                <li>
                  <div id="sparklinedash" />
                </li>
                <li className="text-right"><i className="ti-arrow-up text-success" /> <span className="counter text-success">8659</span></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-sm-3 col-xs-12">
            <div className="white-box analytics-info">
              <h3 className="box-title">Total Income</h3>
              <ul className="list-inline two-part">
                <li>
                  <div id="sparklinedash2" />
                </li>
                <li className="text-right"><i className="ti-arrow-up text-purple" /> <span className="counter text-purple">7469</span></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-sm-3 col-xs-12">
            <div className="white-box analytics-info">
              <h3 className="box-title">Unique Patients</h3>
              <ul className="list-inline two-part">
                <li>
                  <div id="sparklinedash3" />
                </li>
                <li className="text-right"><i className="ti-arrow-up text-info" /> <span className="counter text-info">6011</span></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-sm-3 col-xs-12">
            <div className="white-box analytics-info">
              <h3 className="box-title">Normal Rate</h3>
              <ul className="list-inline two-part">
                <li>
                  <div id="sparklinedash4" />
                </li>
                <li className="text-right"><i className="ti-arrow-down text-danger" /> <span className="text-danger">18%</span></li>
              </ul>
            </div>
          </div>
        </div>
        {/* /.row */}
        {/* row */}
        <div className="row">
          <div className="col-md-4 col-sm-12 col-xs-12">
            <div className="white-box">
              <h3 className="box-title"><small className="pull-right m-t-10 text-success"><i className="fa fa-sort-asc" /> 18% High then last month</small> Income Analysis</h3>
              <div className="stats-row">
                <div className="stat-item">
                  <h6>Overall Growth</h6> <b>80.40%</b></div>
                <div className="stat-item">
                  <h6>Montly</h6> <b>15.40%</b></div>
                <div className="stat-item">
                  <h6>Day</h6> <b>5.50%</b></div>
              </div>
              <div id="sparkline8" />
            </div>
          </div>
          <div className="col-md-4 col-sm-12 col-xs-12">
            <div className="white-box">
              <h3 className="box-title"><small className="pull-right m-t-10 text-danger"><i className="fa fa-sort-desc" /> 18% High then last month</small>Income Analysis</h3>
              <div className="stats-row">
                <div className="stat-item">
                  <h6>Overall Growth</h6> <b>80.40%</b></div>
                <div className="stat-item">
                  <h6>Montly</h6> <b>15.40%</b></div>
                <div className="stat-item">
                  <h6>Day</h6> <b>5.50%</b></div>
              </div>
              <div id="sparkline9" />
            </div>
          </div>
          <div className="col-md-4 col-sm-12 col-xs-12">
            <div className="white-box">
              <h3 className="box-title"><small className="pull-right m-t-10 text-success"><i className="fa fa-sort-asc" /> 18% High then last month</small>Income Analysis</h3>
              <div className="stats-row">
                <div className="stat-item">
                  <h6>Overall Growth</h6> <b>80.40%</b></div>
                <div className="stat-item">
                  <h6>Montly</h6> <b>15.40%</b></div>
                <div className="stat-item">
                  <h6>Day</h6> <b>5.50%</b></div>
              </div>
              <div id="sparkline10" />
            </div>
          </div>
        </div>
        {/* /.row */}
        {/* row */}
        <div className="row">
          <div className="col-sm-12 col-xs-12 col-md-12 col-lg-6">
            <div className="row">
              <div className="col-lg-12">
                <div className="white-box">
                  <h3 className="box-title">Bar Chart</h3>
                  <div id="sparkline12" className="text-center" />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="white-box">
                  <h3 className="box-title">Pie Chart</h3>
                  <div id="sparkline11" className="text-center" />
                </div>
              </div>
            </div>
            {/* /Portlet */}
          </div>
          <div className="col-sm-12 col-xs-12 col-md-12 col-lg-6 ">
            <div className="row">
              <div className="col-md-12">
                <div className="white-box">
                  <h3 className="box-title">Composite Bar Chart</h3>
                  <div id="sparkline13" className="text-center" />
                </div>
              </div>
              <div className="col-md-12">
                <div className="white-box bg-purple">
                  <h3 className="text-white box-title">Line Chart</h3>
                  <div id="sparkline14" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /.row */}
        {/* row */}
        <div className="row">
          <div className="col-sm-12 col-xs-12 col-md-12 col-lg-6 ">
            <div className="white-box">
              <h3 className="box-title">bar with different color Chart</h3>
              <div id="sparkline15" className="text-center" />
            </div>
          </div>
          <div className="col-sm-12 col-xs-12 col-md-12 col-lg-6">
            <div className="white-box">
              <h3 className="box-title">Line Chart</h3>
              <div id="sparkline16" className="text-center" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ReportDoanhThu