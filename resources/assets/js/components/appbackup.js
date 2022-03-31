import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Header from './Header'
import SideBarMain from './SideBarMain'
import MetaPage from './MetaPage'
import DashBoard from './DashBoard'
import DashBoardMonth from './DashBoardMonth'
import AllCustomer from './customer/AllCustomer'
import AddCustomer from './customer/AddCustomer'
import EditCustomer from './customer/EditCustomer'
import ProfileCustomer from './customer/ProfileCustomer'
import KhamMoi from './customer/KhamMoi'
import ChiPhi from './customer/ChiPhi'
import TaoThanhToan from './customer/TaoThanhToan'
import ThanhToanDaXoa from './customer/ThanhToanDaXoa'
import HoaDon from './customer/HoaDon'
import InHoaDon from './customer/InHoaDon'
import PhieuDon from './customer/PhieuDon'
import LichHen from './customer/LichHen'
import LichHenTong from './customer/LichHenTong'
import LichHenDieuTri from './customer/LichHenDieuTri'
import DieuTriThanhToan from './customer/DieuTriThanhToan'
import DieuTriThanhToanTheoLich from './customer/DieuTriThanhToanTheoLich'
import DieuTriTheoLich from './customer/DieuTriTheoLich'
import DonThuoc from './customer/DonThuoc'
import DanhSachAnhDieuTri from './customer/DanhSachAnhDieuTri'
import DanhSachAnhLichHen from './customer/DanhSachAnhLichHen'
import ThemAnhDieuTri from './customer/ThemAnhDieuTri'
import ThemAnhLichHen from './customer/ThemAnhLichHen'
import HoaDonThanhToan from './customer/HoaDonThanhToan'
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
import ThietLapDSDichVu from './system/ThietLapDSDichVu'
import ThietLapDichVu from './system/ThietLapDichVu'
import ThietLapChanDoan from './system/ThietLapChanDoan'
import ThietLapDungCu from './system/ThietLapDungCu'
import ThietLapDuocPham from './system/ThietLapDuocPham'
import ThietLapNguonGioiThieu from './system/ThietLapNguonGioiThieu'
import ThietLapTienSuBenh from './system/ThietLapTienSuBenh'
import ThietLapNhomKhachHang from './system/ThietLapNhomKhachHang'
import ChiTieuHangNgay from './chitieuhangngay/ChiTieuHangNgay'
import InDonThuoc from './customer/InDonThuoc';
import Login from './Login'
import LoaiQuangCao from './quangcao/LoaiQuangCao'
import SanPhamQuangCao from './quangcao/SanPhamQuangCao'
import QuangCao from './quangcao/QuangCao'
import BieuDoQuangCao from './quangcao/BieuDoQuangCao'
import HoaHongBacSi from './bacsi/HoaHongBacSi'
import HoaHongTheoBacSi from './bacsi/HoaHongTheoBacSi'
class App extends Component {
  
  render () {
    let login = localStorage.getItem('jwt');
    let userid = localStorage.getItem('userid');
    let userrole = localStorage.getItem('userrole');
    if (!login) { 
       
        return (
            <BrowserRouter>
           
<HashRouter>
                <div>
                    <Redirect to='login'/>
                    
                    <Route path='/login' exact component={Login} />
                   
                </div>
            </HashRouter>
           
            <Switch>
            <Route path='/tong-quan' component={DashBoard} />
            </Switch>
               
                   
              
          
            
            </BrowserRouter>
        )
        
    }
    else
    {
      
      if(userrole==3)
      {
        return(

          <BrowserRouter>
              
                  
                
                
              <Header />
              <SideBarMain />
              <div id="page-wrapper">
            <div className="container-fluid">
              <MetaPage />
          
              <Switch>
               <Route exact path='/' component={LichHenTong} />
           
               
                <Route exact path='/them-khach-hang' component={AddCustomer} />
                <Route exact path='/sua-khach-hang' component={EditCustomer} />
                <Route exact path='/ho-so-khach-hang/:id'  component={ProfileCustomer} />
                <Route exact path='/kham-moi/:id'  component={KhamMoi} />
                <Route exact path='/chi-phi/:id/:idkm'  component={ChiPhi} />
                <Route exact path='/tao-thanh-toan/:id/:idkm'  component={TaoThanhToan} />
                <Route exact path='/thanh-toan-da-xoa/:id/:idkm'  component={ThanhToanDaXoa} />
                <Route exact path='/hoa-don/:id/:idkm/:idtt'  component={HoaDon} />
                <Route exact path='/dieu-tri-theo-lich/:idkh/:idkm'  component={DieuTriTheoLich} />
                <Route exact path='/phieu-dieu-chi-chi-tiet/:idkh/:id'  component={PhieuDon} />
                <Route exact path='/lich-hen-khach-hang/:id'  component={LichHen} />
                <Route exact path='/lich-hen-dieu-tri/:id/:idkm/:iddt'  component={LichHenDieuTri} />
              <Route exact path='/lich-hen-tong'  component={LichHenTong} />
                <Route exact path='/lap-phieu-khach-hang/:id'  component={DieuTriThanhToan} />
                <Route exact path='/lap-phieu-khach-hang-theo-lich/:id/:idlich'  component={DieuTriThanhToanTheoLich} />
                <Route exact path='/don-thuoc-khach-hang/:id'  component={DonThuoc} />
                <Route exact path='/in-hoa-don-khach-hang/:idlich/:idkh/:id'  component={HoaDonThanhToan} />
                <Route exact path='/in-don-thuoc-khach-hang/:idkh/:id/:iddonthuoc'  component={InDonThuoc} />
              <Route exact path='/anh-dieu-tri-khach-hang/:idkh/:idkm/:iddt'  component={ThemAnhDieuTri} />
              <Route exact path='/anh-sau-dieu-tri-khach-hang/:idkh/:idkm'  component={ThemAnhLichHen} />
                <Route exact path='/tat-ca-bac-si' component={AllDoctor} />
                <Route exact path='/them-bac-si' component={AddDoctor} />
                <Route exact path='/sua-bac-si' component={EditDoctor} />
                <Route exact path='/ho-so-bac-si' component={ProfileDoctor} />
                <Route exact path='/chi-tieu-hang-ngay' component={ChiTieuHangNgay} />
                <Route exact path='/thoi-gian-bieu-bac-si' component={TimetableDoctor} />
                <Route exact path='/lich-hen-bac-si' component={CalendarBooking} />
                <Route exact path='/thanh-toan' component={Checkout} />
                <Route exact path='/them-thanh-toan' component={AddPayment} />
                <Route exact path='/hoa-don-khach-hang' component={InvoiceCustomer} />
                <Route exact path='/bao-cao-tong-quan' component={ReportAll} />
                <Route exact path='/bao-cao-doanh-thu' component={ReportDoanhThu} />
                <Route exact path='/thiet-lap-dich-vu' component={ThietLapDSDichVu} />
                <Route exact path='/thiet-lap-dieu-tri' component={ThietLapDichVu} />
                <Route exact path='/thiet-lap-chan-doan' component={ThietLapChanDoan} />
                <Route exact path='/thiet-lap-dung-cu' component={ThietLapDungCu} />
                <Route exact path='/thiet-lap-duoc-pham' component={ThietLapDuocPham} />
                <Route exact path='/thiet-lap-nguon-gioi-thieu' component={ThietLapNguonGioiThieu} />
                <Route exact path='/thiet-lap-tien-su-benh' component={ThietLapTienSuBenh} />
                <Route exact path='/thiet-lap-nhom-khach-hang' component={ThietLapNhomKhachHang} />
                <Route exact path='/loai-quang-cao' component={LoaiQuangCao} />
                <Route exact path='/san-pham-quang-cao' component={SanPhamQuangCao} />
                <Route exact path='/quang-cao' component={QuangCao} />
                <Route exact path='/bieu-do-quang-cao' component={BieuDoQuangCao} />
                <Route exact path='/hoa-hong-theo-bac-si' component={HoaHongTheoBacSi} />
              </Switch>
              </div>
          <footer className="footer text-center"> 2020 &copy; ỨNG DỤNG QUẢN LÝ PHÒNG KHÁM NHA KHOA </footer>
               </div>
              
          
          
            
            
          </BrowserRouter>
           
           )
      }
      else
      {
        return(

          <BrowserRouter>
              
                  
                
                
              <Header />
              <SideBarMain />
              <div id="page-wrapper">
            <div className="container-fluid">
              <MetaPage />
          
              <Switch>
               <Route exact path='/' component={AllCustomer} />
                <Route path='/tong-quan' component={DashBoard} />
                <Route path='/tong-quan-theo-thang' component={DashBoardMonth} />
                <Route exact path='/tat-ca-khach-hang' component={AllCustomer} />
                <Route exact path='/them-khach-hang' component={AddCustomer} />
                <Route exact path='/sua-khach-hang' component={EditCustomer} />
                <Route exact path='/ho-so-khach-hang/:id'  component={ProfileCustomer} />
                <Route exact path='/kham-moi/:id'  component={KhamMoi} />
                <Route exact path='/chi-phi/:id/:idkm'  component={ChiPhi} />
                <Route exact path='/tao-thanh-toan/:id/:idkm'  component={TaoThanhToan} />
                <Route exact path='/thanh-toan-da-xoa/:id/:idkm'  component={ThanhToanDaXoa} />
                <Route exact path='/hoa-don/:id/:idkm/:idtt'  component={HoaDon} />
                <Route exact path='/dieu-tri-theo-lich/:idkh/:idkm'  component={DieuTriTheoLich} />
                <Route exact path='/phieu-dieu-chi-chi-tiet/:idkh/:id'  component={PhieuDon} />
                <Route exact path='/lich-hen-khach-hang/:id'  component={LichHen} />
                <Route exact path='/lich-hen-dieu-tri/:id/:idkm/:iddt'  component={LichHenDieuTri} />
              <Route exact path='/lich-hen-tong'  component={LichHenTong} />
                <Route exact path='/lap-phieu-khach-hang/:id'  component={DieuTriThanhToan} />
                <Route exact path='/lap-phieu-khach-hang-theo-lich/:id/:idlich'  component={DieuTriThanhToanTheoLich} />
                <Route exact path='/don-thuoc-khach-hang/:id'  component={DonThuoc} />
                <Route exact path='/in-hoa-don-khach-hang/:idlich/:idkh/:id'  component={HoaDonThanhToan} />
                <Route exact path='/in-don-thuoc-khach-hang/:idkh/:id/:iddonthuoc'  component={InDonThuoc} />
              <Route exact path='/anh-dieu-tri-khach-hang/:idkh/:idkm/:iddt'  component={ThemAnhDieuTri} />
              <Route exact path='/anh-sau-dieu-tri-khach-hang/:idkh/:idkm'  component={ThemAnhLichHen} />
                <Route exact path='/tat-ca-bac-si' component={AllDoctor} />
                <Route exact path='/them-bac-si' component={AddDoctor} />
                <Route exact path='/sua-bac-si' component={EditDoctor} />
                <Route exact path='/ho-so-bac-si' component={ProfileDoctor} />
                <Route exact path='/chi-tieu-hang-ngay' component={ChiTieuHangNgay} />
                <Route exact path='/thoi-gian-bieu-bac-si' component={TimetableDoctor} />
                <Route exact path='/lich-hen-bac-si' component={CalendarBooking} />
                <Route exact path='/thanh-toan' component={Checkout} />
                <Route exact path='/them-thanh-toan' component={AddPayment} />
                <Route exact path='/hoa-don-khach-hang' component={InvoiceCustomer} />
                <Route exact path='/bao-cao-tong-quan' component={ReportAll} />
                <Route exact path='/bao-cao-doanh-thu' component={ReportDoanhThu} />
                <Route exact path='/thiet-lap-dich-vu' component={ThietLapDSDichVu} />
                <Route exact path='/thiet-lap-dieu-tri' component={ThietLapDichVu} />
                <Route exact path='/thiet-lap-chan-doan' component={ThietLapChanDoan} />
                <Route exact path='/thiet-lap-dung-cu' component={ThietLapDungCu} />
                <Route exact path='/thiet-lap-duoc-pham' component={ThietLapDuocPham} />
                <Route exact path='/thiet-lap-nguon-gioi-thieu' component={ThietLapNguonGioiThieu} />
                <Route exact path='/thiet-lap-tien-su-benh' component={ThietLapTienSuBenh} />
                <Route exact path='/thiet-lap-nhom-khach-hang' component={ThietLapNhomKhachHang} />
                <Route exact path='/loai-quang-cao' component={LoaiQuangCao} />
                <Route exact path='/san-pham-quang-cao' component={SanPhamQuangCao} />
                <Route exact path='/quang-cao' component={QuangCao} />
                <Route exact path='/bieu-do-quang-cao' component={BieuDoQuangCao} />
                <Route exact path='/hoa-hong-bac-si' component={HoaHongBacSi} />
              </Switch>
              </div>
          <footer className="footer text-center"> 2020 &copy; ỨNG DỤNG QUẢN LÝ PHÒNG KHÁM NHA KHOA </footer>
               </div>
              
          
          
            
            
          </BrowserRouter>
           
           )
      }

 }
  }
}
    
 

ReactDOM.render(<App />, document.getElementById('root'))