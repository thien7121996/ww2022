import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Header from './Header'
import SideBarMain from './SideBarMain'
import MetaPage from './MetaPage'
import DashBoard from './DashBoard'
import AllCustomer from './customer/AllCustomer'
import AddCustomer from './customer/AddCustomer'
import EditCustomer from './customer/EditCustomer'
import ProfileCustomer from './customer/ProfileCustomer'
import AllDoctor from './doctor/AllDoctor'
import AddDoctor from './doctor/AddDoctor'
import EditDoctor from './doctor/EditDoctor'
import ProfileDoctor from './doctor/ProfileDoctor'
import AddPayment from './payment/AddPayment'
import Checkout from './payment/Checkout'
import InvoiceCustomer from './payment/InvoiceCustomer'
import CalendarBooking from './timetable/CalendarBooking'
import TimetableDoctor from './timetable/TimetableDoctor'
import ReportAll from './report/ReportAll'
import ReportDoanhThu from './report/ReportDoanhThu'
import ThietLapDichVu from './system/ThietLapDichVu'
import ThietLapChanDoan from './system/ThietLapChanDoan'
import ThietLapDungCu from './system/ThietLapDungCu'
import ThietLapDuocPham from './system/ThietLapDuocPham'
import ThietLapNguonGioiThieu from './system/ThietLapNguonGioiThieu'
import ThietLapTienSuBenh from './system/ThietLapTienSuBenh'
import ThietLapNhomKhachHang from './system/ThietLapNhomKhachHang'
import ThietLapLaboCongTy from './system/ThietLapLaboCongTy'
import ThietLapLaboCongViec from './system/ThietLapLaboCongViec'
import NewProject from './NewProject'
import ProjectsList from './ProjectsList'
import Login from './Login'
import ChiTieuHangNgay from './chitieuhangngay/ChiTieuHangNgay'
import ThongKeNhap from './thongke/ThongKeNhap'
import ChuongTrinhKhuyenMai from './chuongtrinhkhuyenmai/ChuongTrinhKhuyenMai'
class KhachHang extends Component {
  render () {
    
 
    return (
      <BrowserRouter>
        <div>
      
          <MetaPage />

          <Switch>
        
           
            <Route exact path='/ho-so-khach-hang/:id'  component={ProfileCustomer} />
        
          </Switch>
     
          
      </div>
      
     
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<KhachHang />, document.getElementById('khachhang'))