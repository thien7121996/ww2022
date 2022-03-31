import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ReportAll extends Component {
  componentWillMount() {
    const scripts = [
      '../app_assets/plugins/bower_components/Chart.js/chartjs.init.js',
      '../app_assets/plugins/bower_components/Chart.js/Chart.min.js',

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
        <div className="col-sm-6">
          <div className="white-box">
            <h3 className="box-title">Line Chart</h3>
            <div>
              <canvas id="chart1" height={150} />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="white-box">
            <h3 className="box-title">Bar Chart</h3>
            <div>
              <canvas id="chart2" height={150} />
            </div>
          </div>
        </div>
      </div>
      {/* /.row */}
      {/* .row */}
      <div className="row">
        <div className="col-lg-6">
          <div className="white-box">
            <h3 className="box-title">Pie Chart</h3>
            <div>
              <canvas id="chart3" height={150} />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="white-box">
            <h3 className="box-title">Doughnut Chart</h3>
            <div>
              <canvas id="chart4" height={150}> </canvas>
            </div>
          </div>
        </div>
      </div>
      {/* /.row */}
      {/* .row */}
      <div className="row">
        <div className="col-lg-6">
          <div className="white-box">
            <h3 className="box-title">Polar Area Chart</h3>
            <div>
              <canvas id="chart5" height={150} />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="white-box">
            <h3 className="box-title">Radar Chart</h3>
            <div>
              <canvas id="chart6" height={150} />
            </div>
          </div>
        </div>
      </div>
      {/* /.row */}
    </div>
     
    )
  }
}

export default ReportAll