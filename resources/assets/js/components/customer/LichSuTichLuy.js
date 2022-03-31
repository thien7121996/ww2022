import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class LichSuTichLuy extends Component {
    constructor (props) {
        super(props)

    this.state = {
        lichsutichluy: [],
        idkhachhang: this.props.match.params.id,
        phantramthanhvien:''

    }
   
  

  }
  componentWillMount() {
    const scripts = [
      './public/app_assets/js/datatable/custom.js',
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
    axios.get('/index.php/api/lichsutichluy/'+this.state.idkhachhang).then(response => {
        this.setState({
          lichsutichluy: response.data
        })
      })
      axios.get('/index.php/api/doanhthutheokhachhang/'+this.state.idkhachhang).then(response => {
        this.setState({
          phantramthanhvien: response.data[0].phantram
        })
      })
  }
  componentDidMount() {
   
  }

  
  

render () {
const { lichsutichluy,phantramthanhvien,idkhachhang } = this.state;

return (
    <div className="row">
    <div className="col-sm-12">
    <section>
<div className="sttabs tabs-style-bar">
<nav>
 <ul>
   <li className=""><Link to={'/ho-so-khach-hang/'+idkhachhang} className="sticon"><span>Quay lại</span></Link></li>
  
  
 

 </ul>
</nav>

{/* /content */}
</div>
{/* /tabs */}
</section>
      <div className="white-box">
        <h3 className="box-title">LỊCH SỬ TIỀN ĐƯỢC HƯỞNG %
</h3>

  <div className="row">
  
    
    <div className="col-sm-12">
   
 
      <div className="table-responsive">
        <table className="table-bordered table-hover table color-table primary-table" >
          <thead>
            <tr>
            <th>STT</th>
              <th>Khách hàng sử dụng dịch vụ</th>
              <th>Tiền thanh toán</th>
              <th>Dịch vụ</th>
              <th>Hoa hồng được hưởng</th>
              
            </tr>
          </thead>
         
          <tbody>
          {lichsutichluy.map((dv,index) => ( 
            <tr id={"capdoitem"+dv.id} data-itemdv={dv.id}>
                <td>{index+1}</td>
              <td data-iddv={dv.id} className="danhturieng"><Link to={"/ho-so-khach-hang/"+dv.khachhangdichvu}>{dv.khachhangs.hoten}</Link></td>
              <td>{dv.tienthanhtoan.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} VNĐ</td>
              <td>
              {console.log(JSON.parse(dv.chitiettichdiem))}
              {JSON.parse(dv.chitiettichdiem).map(ct => ( 
                <p>{ct.dieutri}</p>
             
              
              ))}
              </td>
          
                <td>{Number(Number(dv.tienthanhtoan)*Number(phantramthanhvien)*0.01).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} VNĐ</td>
             
            </tr>
          ))}
            
          </tbody>
        </table>
      </div>
    
  </div>
</div>
      </div>
    </div>
   

  </div>
  )
}
}

export default LichSuTichLuy