import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Checkout extends Component {
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
        <div className="row">
        <div className="col-sm-12">
          <div className="white-box">
            <h3 className="box-title m-b-0">Chi tiết thanh toán phòng khám</h3>
            <hr />
            <div className="table-responsive">
              <table id="myTable" className="table table-striped">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Khách hàng</th>
                    <th>Bác sĩ</th>
                    <th>Ngày</th>
                    <th>Chi phí</th>
                    <th>Giảm giá</th>
                    <th>Tông</th>
                    <th>Chi tiết</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Tiger Nixon</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$610</td>
                    <td>15%</td>
                    <td>$320</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Garrett Winters</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$630</td>
                    <td>15%</td>
                    <td>$170</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Ashton Cox</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$660</td>
                    <td>15%</td>
                    <td>$860</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Cedric Kelly</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$220</td>
                    <td>15%</td>
                    <td>$433</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Airi Satou</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$330</td>
                    <td>15%</td>
                    <td>$162</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Brielle Williamson</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$610</td>
                    <td>15%</td>
                    <td>$372</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>Herrod Chandler</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$590</td>
                    <td>15%</td>
                    <td>$137</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>Rhona Davidson</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$550</td>
                    <td>15%</td>
                    <td>$327</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>9</td>
                    <td>Colleen Hurst</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$390</td>
                    <td>15%</td>
                    <td>$205</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td>Sonya Frost</td>
                    <td>Steve Gection</td>
                    <td>2008/12/13</td>
                    <td>$230</td>
                    <td>15%</td>
                    <td>$103</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>31</td>
                    <td>Tiger Nixon</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$610</td>
                    <td>15%</td>
                    <td>$320</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>28</td>
                    <td>Garrett Winters</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$630</td>
                    <td>15%</td>
                    <td>$170</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>73</td>
                    <td>Ashton Cox</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$660</td>
                    <td>15%</td>
                    <td>$860</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>44</td>
                    <td>Cedric Kelly</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$220</td>
                    <td>15%</td>
                    <td>$433</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>95</td>
                    <td>Airi Satou</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$330</td>
                    <td>15%</td>
                    <td>$162</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>76</td>
                    <td>Brielle Williamson</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$610</td>
                    <td>15%</td>
                    <td>$372</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>67</td>
                    <td>Herrod Chandler</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$590</td>
                    <td>15%</td>
                    <td>$137</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>83</td>
                    <td>Rhona Davidson</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$550</td>
                    <td>15%</td>
                    <td>$327</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>19</td>
                    <td>Colleen Hurst</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$390</td>
                    <td>15%</td>
                    <td>$205</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>14</td>
                    <td>Sonya Frost</td>
                    <td>Steve Gection</td>
                    <td>2008/12/13</td>
                    <td>$230</td>
                    <td>15%</td>
                    <td>$103</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>13</td>
                    <td>Tiger Nixon</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$610</td>
                    <td>15%</td>
                    <td>$320</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>25</td>
                    <td>Garrett Winters</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$630</td>
                    <td>15%</td>
                    <td>$170</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>39</td>
                    <td>Ashton Cox</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$660</td>
                    <td>15%</td>
                    <td>$860</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>41</td>
                    <td>Cedric Kelly</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$220</td>
                    <td>15%</td>
                    <td>$433</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>53</td>
                    <td>Airi Satou</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$330</td>
                    <td>15%</td>
                    <td>$162</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>65</td>
                    <td>Brielle Williamson</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$610</td>
                    <td>15%</td>
                    <td>$372</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>77</td>
                    <td>Herrod Chandler</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$590</td>
                    <td>15%</td>
                    <td>$137</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>80</td>
                    <td>Rhona Davidson</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$550</td>
                    <td>15%</td>
                    <td>$327</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>90</td>
                    <td>Colleen Hurst</td>
                    <td>Steve Gection</td>
                    <td>2011/04/25</td>
                    <td>$390</td>
                    <td>15%</td>
                    <td>$205</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                  <tr>
                    <td>100</td>
                    <td>Sonya Frost</td>
                    <td>Steve Gection</td>
                    <td>2008/12/13</td>
                    <td>$230</td>
                    <td>15%</td>
                    <td>$103</td>
                    <td><Link to="/hoa-don-khach-hang">Xem</Link></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Checkout