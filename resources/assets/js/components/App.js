import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Header from './Header'
import SideBarMain from './SideBarMain'
import MetaPage from './MetaPage'
import DashBoard from './DashBoard'
import DashBoardMonth from './DashBoardMonth'
import DashBoardDoctor from './DashBoardDoctor'
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
import ThietLapChiNhanh from './system/ThietLapChiNhanh'
import ThietLapNhomKhachHang from './system/ThietLapNhomKhachHang'
import LichSuChinhSua from './system/LichSuChinhSua'
import TaiKhoan from './system/TaiKhoan'
import ChiTieuHangNgay from './chitieuhangngay/ChiTieuHangNgay'
import InDonThuoc from './customer/InDonThuoc';
import Login from './Login'
import LoaiQuangCao from './quangcao/LoaiQuangCao'
import SanPhamQuangCao from './quangcao/SanPhamQuangCao'
import QuangCao from './quangcao/QuangCao'
import BieuDoQuangCao from './quangcao/BieuDoQuangCao'
import HoaHongBacSi from './bacsi/HoaHongBacSi'
import HoaHongTheoBacSi from './bacsi/HoaHongTheoBacSi'
import CapDo from './system/CapDo'
import LichSuTichLuy from './customer/LichSuTichLuy'
import Role from './system/Role'
import HoaHongSale from './sale/HoaHongSale'
import HoaHongDirectSale from './sale/HoaHongDirectSale'
import BenhLyHoanThanh from './cskh/BenhLyHoanThanh'
import LichHenCSKH from './cskh/LichHenCSKH'
import DoanhThuTheoBacSi from './DoanhThuTheoBacSi'
import DoanhThuSaleOnline from './DoanhThuSaleOnline'
import DoanhThuDirectSale from './DoanhThuDirectSale'
import HoaHongTheoSaleOnline from './HoaHongTheoSaleOnline'
import HoaHongTheoDirectSale from './HoaHongTheoDirectSale'
import HoaHongGioiThieu from './HoaHongGioiThieu'
import NguonCongTy from './nguoncongty/NguonCongTy'
import NguonTheoCongTy from './nguoncongty/NguonTheoCongTy'
import HoaHongTheoNguonCongTy from './nguoncongty/HoaHongTheoNguonCongTy'
import LichHenCongTy from './customer/LichHenCongTy'
import GiaoViec from './giaoviec/GiaoViec'
import ViecNhan from './giaoviec/ViecNhan'
import ViecGiao from './giaoviec/ViecGiao'
import TheoDoi from './giaoviec/TheoDoi'
import Khay from './khay/Khay'
import QuanLyKhay from './khay/QuanLyKhay'
import NhacNhoHoanThanh from './cskh/NhacNhoHoanThanh'
import QuanLyBenhLy from './QuanLyBenhLy'
import DashBoardTungNgay from './doanhthu/DashBoardTungNgay'
import DashBoardNguon from './doanhthu/DashBoardNguon'
import DashBoardBacSi from './doanhthu/DashBoardBacSi'
import DashBoardDichVu from './doanhthu/DashBoardDichVu'
import DashBoardTeleSale from './doanhthu/DashBoardTeleSale'
import DashBoardDirectSale from './doanhthu/DashBoardDirectSale'
import DashBoardSaleByLeader from './doanhthu/DashBoardSaleByLeader'

import DashBoardKhach from './doanhthu/DashBoardKhach'
import DashBoardKhachChot from './doanhthu/DashBoardKhachChot'
import DashBoardKhachKhongDen from './doanhthu/DashBoardKhachKhongDen'
import LichLamViec from './bacsi/LichLamViec'
import LichNghiViec from './bacsi/LichNghiViec'
import LichLamViecTrongDieuTri from './bacsi/LichLamViecTrongDieuTri'
import LichTongTheoNgay from './bacsi/LichTongTheoNgay'
import BaoCaoBieuDo from './report/BaoCaoBieuDo'
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
                <Route exact path='/thiet-lap-chi-nhanh' component={ThietLapChiNhanh} />
                <Route exact path='/loai-quang-cao' component={LoaiQuangCao} />
                <Route exact path='/san-pham-quang-cao' component={SanPhamQuangCao} />
                <Route exact path='/quang-cao' component={QuangCao} />
                <Route exact path='/bieu-do-quang-cao' component={BieuDoQuangCao} />
                <Route exact path='/hoa-hong-theo-bac-si' component={HoaHongTheoBacSi} />
                <Route exact path='/lich-su-tich-luy/:id'  component={LichSuTichLuy} />
                <Route exact path='/lich-su-chinh-sua' component={LichSuChinhSua} />
                <Route exact path='/tai-khoan' component={TaiKhoan} />
                <Route exact path='/doanh-thu-theo-bac-si' component={DoanhThuTheoBacSi} />
				<Route exact path='/viec-nhan' component={ViecNhan} />
				<Route exact path='/viec-giao' component={ViecGiao} />
				<Route exact path='/theo-doi' component={TheoDoi} />
				 <Route exact path='/lich-lam-viec-trong-dieu-tri/:idkm/:iddt/:idbs/:idlht' component={LichLamViecTrongDieuTri} />
              </Switch>
              </div>
          <footer className="footer text-center"> 2020 &copy; ỨNG DỤNG QUẢN LÝ PHÒNG KHÁM NHA KHOA </footer>
               </div>
              
          
          
            
            
          </BrowserRouter>
           
           )
      }
      else if(userrole==6)
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
                <Route path='/doanh-thu-bac-si' component={DashBoardDoctor} />
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
                <Route exact path='/thiet-lap-chi-nhanh' component={ThietLapChiNhanh} />
                <Route exact path='/lich-su-chinh-sua' component={LichSuChinhSua} />
                <Route exact path='/loai-quang-cao' component={LoaiQuangCao} />
                <Route exact path='/san-pham-quang-cao' component={SanPhamQuangCao} />
                <Route exact path='/quang-cao' component={QuangCao} />
                <Route exact path='/bieu-do-quang-cao' component={BieuDoQuangCao} />
                <Route exact path='/hoa-hong-bac-si' component={HoaHongBacSi} />
                <Route exact path='/cap-do' component={CapDo} />
                <Route exact path='/lich-su-tich-luy/:id'  component={LichSuTichLuy} />
                <Route exact path='/tai-khoan' component={TaiKhoan} />
                <Route exact path='/role' component={Role} />
                <Route exact path='/quan-ly-benh-ly-hoan-thanh' component={BenhLyHoanThanh} />
                <Route exact path='/lich-hen-cskh' component={LichHenCSKH} />
				<Route exact path='/nhac-nho-hoan-thanh/' component={NhacNhoHoanThanh} />
				<Route exact path='/viec-nhan' component={ViecNhan} />
				<Route exact path='/viec-giao' component={ViecGiao} />
				 <Route exact path='/lich-lam-viec-trong-dieu-tri/:idkm/:iddt/:idbs/:idlht' component={LichLamViecTrongDieuTri} />
				<Route exact path='/theo-doi' component={TheoDoi} />
				<Route exact path='/quan-ly-benh-ly' component={QuanLyBenhLy} />
				
              </Switch>
              </div>
          <footer className="footer text-center"> 2020 &copy; ỨNG DỤNG QUẢN LÝ PHÒNG KHÁM NHA KHOA </footer>
               </div>
              
          
          
            
            
          </BrowserRouter>
           
           )
       
      }
      else if(userrole==5)
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
              <Route exact path='/hoa-hong-theo-direct-sale' component={HoaHongDirectSale} />
           
           
              <Route exact path='/tat-ca-khach-hang' component={AllCustomer} />
           <Route exact path='/them-khach-hang' component={AddCustomer} />
           <Route path='/doanh-thu-bac-si' component={DashBoardDoctor} />
           <Route path='/tong-quan-theo-thang' component={DashBoardMonth} />
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
           <Route exact path='/thiet-lap-chi-nhanh' component={ThietLapChiNhanh} />
           <Route exact path='/loai-quang-cao' component={LoaiQuangCao} />
           <Route exact path='/san-pham-quang-cao' component={SanPhamQuangCao} />
           <Route exact path='/quang-cao' component={QuangCao} />
           <Route exact path='/bieu-do-quang-cao' component={BieuDoQuangCao} />
           <Route exact path='/hoa-hong-theo-bac-si' component={HoaHongTheoBacSi} />
           <Route exact path='/lich-su-tich-luy/:id'  component={LichSuTichLuy} />
           <Route exact path='/lich-su-chinh-sua' component={LichSuChinhSua} />
           <Route exact path='/tai-khoan' component={TaiKhoan} />
           <Route exact path='/doanh-thu-theo-bac-si' component={DoanhThuTheoBacSi} />
		    <Route exact path='/lich-lam-viec-trong-dieu-tri/:idkm/:iddt/:idbs/:idlht' component={LichLamViecTrongDieuTri} />
        <Route exact path='/hoa-hong-theo-sale' component={HoaHongDirectSale} />
        <Route path='/tong-quan' component={DashBoard} />
		<Route exact path='/viec-nhan' component={ViecNhan} />
	<Route exact path='/bao-cao-doanh-thu-sale-leader' component={DashBoardSaleByLeader} />
				<Route exact path='/viec-giao' component={ViecGiao} />
				<Route exact path='/theo-doi' component={TheoDoi} />
				<Route exact path='/quan-ly-benh-ly' component={QuanLyBenhLy} />
              </Switch>
              </div>
          <footer className="footer text-center"> 2020 &copy; ỨNG DỤNG QUẢN LÝ PHÒNG KHÁM NHA KHOA </footer>
               </div>
              
          
          
            
            
          </BrowserRouter>
           
           )
       
      }
      else if(userrole==4)
      {
        return(

          <BrowserRouter>
              
                  
                
                
              <Header />
              <SideBarMain />
              <div id="page-wrapper">
            <div className="container-fluid">
              <MetaPage />
          
              <Switch>
              <Route path='/tong-quan' component={DashBoard} />
              <Route exact path='/' component={AllCustomer} />
              <Route exact path='/tat-ca-khach-hang' component={AllCustomer} />
           <Route exact path='/them-khach-hang' component={AddCustomer} />
           <Route exact path='/sua-khach-hang' component={EditCustomer} />
           <Route exact path='/ho-so-khach-hang/:id'  component={ProfileCustomer} />
           <Route exact path='/kham-moi/:id'  component={KhamMoi} />
           <Route exact path='/lich-hen-tong'  component={LichHenTong} />
           <Route path='/tong-quan-theo-thang' component={DashBoardMonth} />
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
           <Route exact path='/thiet-lap-chi-nhanh' component={ThietLapChiNhanh} />
           <Route exact path='/loai-quang-cao' component={LoaiQuangCao} />
           <Route exact path='/san-pham-quang-cao' component={SanPhamQuangCao} />
           <Route exact path='/quang-cao' component={QuangCao} />
           <Route exact path='/bieu-do-quang-cao' component={BieuDoQuangCao} />
           <Route exact path='/hoa-hong-theo-bac-si' component={HoaHongTheoBacSi} />
           <Route exact path='/lich-su-tich-luy/:id'  component={LichSuTichLuy} />
           <Route exact path='/lich-su-chinh-sua' component={LichSuChinhSua} />
		    <Route exact path='/lich-lam-viec-trong-dieu-tri/:idkm/:iddt/:idbs/:idlht' component={LichLamViecTrongDieuTri} />
           <Route exact path='/tai-khoan' component={TaiKhoan} />
              <Route path='/doanh-thu-bac-si' component={DashBoardDoctor} />
              <Route exact path='/hoa-hong-bac-si' component={HoaHongBacSi} />
        <Route exact path='/hoa-hong-theo-sale' component={HoaHongSale} />
        <Route exact path='/quan-ly-benh-ly-hoan-thanh' component={BenhLyHoanThanh} />
		<Route exact path='/nhac-nho-hoan-thanh/' component={NhacNhoHoanThanh} />
                <Route exact path='/lich-hen-cskh' component={LichHenCSKH} />
				<Route exact path='/viec-nhan' component={ViecNhan} />
				<Route exact path='/viec-giao' component={ViecGiao} />
				<Route exact path='/theo-doi' component={TheoDoi} />
				<Route exact path='/bao-cao-doanh-thu-sale-leader' component={DashBoardSaleByLeader} />
				
              </Switch>
              </div>
          <footer className="footer text-center"> 2020 &copy; ỨNG DỤNG QUẢN LÝ PHÒNG KHÁM NHA KHOA </footer>
               </div>
              
          
          
            
            
          </BrowserRouter>
           
           )
      }
      else if(userrole==7)
      {
        return(

          <BrowserRouter>
              
                  
                
                
              <Header />
              <SideBarMain />
              <div id="page-wrapper">
            <div className="container-fluid">
              <MetaPage />
          
              <Switch>
              <Route path='/doanh-thu-nguon-theo-cong-ty' component={NguonTheoCongTy} />
              <Route path='/hoa-hong-theo-nguon-cong-ty' component={HoaHongTheoNguonCongTy} />
			  <Route path='/lich-hen-theo-cong-ty' component={LichHenCongTy} />
              <Route exact path='/' component={NguonTheoCongTy} />
            <Route exact path='/viec-nhan' component={ViecNhan} />
				<Route exact path='/viec-giao' component={ViecGiao} />
				<Route exact path='/theo-doi' component={TheoDoi} />
				
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
                <Route path='/doanh-thu-bac-si' component={DashBoardDoctor} />
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
                <Route exact path='/thiet-lap-chi-nhanh' component={ThietLapChiNhanh} />
                <Route exact path='/lich-su-chinh-sua' component={LichSuChinhSua} />
                <Route exact path='/loai-quang-cao' component={LoaiQuangCao} />
                <Route exact path='/san-pham-quang-cao' component={SanPhamQuangCao} />
                <Route exact path='/quang-cao' component={QuangCao} />
                <Route exact path='/bieu-do-quang-cao' component={BieuDoQuangCao} />
                <Route exact path='/hoa-hong-bac-si' component={HoaHongBacSi} />
                <Route exact path='/cap-do' component={CapDo} />
                <Route exact path='/lich-su-tich-luy/:id'  component={LichSuTichLuy} />
                <Route exact path='/tai-khoan' component={TaiKhoan} />
                <Route exact path='/role' component={Role} />
                <Route exact path='/quan-ly-benh-ly-hoan-thanh' component={BenhLyHoanThanh} />
                <Route exact path='/lich-hen-cskh' component={LichHenCSKH} />
                <Route exact path='/nhac-nho-hoan-thanh/' component={NhacNhoHoanThanh} />
				<Route exact path='/doanh-thu-sale-online' component={DoanhThuSaleOnline} />
                <Route exact path='/doanh-thu-direct-sale' component={DoanhThuDirectSale} />
                <Route exact path='/hoa-hong-theo-sale-online' component={HoaHongTheoSaleOnline} />
                <Route exact path='/hoa-hong-theo-direct-sale' component={HoaHongTheoDirectSale} />
                <Route exact path='/hoa-hong-gioi-thieu' component={HoaHongGioiThieu} />
                <Route exact path='/doanh-thu-nguon-cong-ty' component={NguonCongTy} />
				<Route exact path='/giao-viec' component={GiaoViec} />
				<Route exact path='/viec-nhan' component={ViecNhan} />
				<Route exact path='/viec-giao' component={ViecGiao} />
				<Route exact path='/theo-doi' component={TheoDoi} />
				<Route exact path='/khay/:id' component={Khay} />
				<Route exact path='/quan-ly-khay/' component={QuanLyKhay} />
				<Route exact path='/nhac-nho-hoan-thanh/' component={NhacNhoHoanThanh} />
				<Route exact path='/doanh-thu-tung-ngay-trong-thang/' component={DashBoardTungNgay} />
				<Route exact path='/doanh-thu-theo-nguon/' component={DashBoardNguon} />
				<Route exact path='/doanh-thu-theo-dich-vu/' component={DashBoardDichVu} />
				<Route exact path='/doanh-thu-theo-bac-si/' component={DashBoardBacSi} />
				<Route exact path='/doanh-thu-theo-tele-sale/' component={DashBoardTeleSale} />
				<Route exact path='/doanh-thu-theo-direct-sale/' component={DashBoardDirectSale} />
				<Route exact path='/bao-cao-khach-hang-den/' component={DashBoardKhach} />
				<Route exact path='/bao-cao-khach-hang-khong-den/' component={DashBoardKhachKhongDen} />
				<Route exact path='/bao-cao-khach-hang-chot/' component={DashBoardKhachChot} />
        <Route exact path='/quan-ly-benh-ly' component={QuanLyBenhLy} />
		        <Route exact path='/lich-tong-theo-ngay' component={LichTongTheoNgay} />
		    <Route exact path='/lich-lam-viec/:id' component={LichLamViec} />
			 <Route exact path='/lich-nghi-viec/:id' component={LichNghiViec} />
			  <Route exact path='/bao-cao-bieu-do' component={BaoCaoBieuDo} />
			 <Route exact path='/lich-lam-viec-trong-dieu-tri/:idkm/:iddt/:idbs/:idlht' component={LichLamViecTrongDieuTri} />
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