import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Header from './Header'
import SideBarMain from './SideBarMain'
import MetaPage from './MetaPage'
import Login from './Login'
import AllCustomer from './customer/AllCustomer'
import AddCustomer from './customer/AddCustomer'
import EditCustomer from './customer/EditCustomer'
import ProfileCustomer from './customer/ProfileCustomer'
import KhamMoi from './customer/KhamMoi'
import LichHenTong from './customer/LichHenTong'
import LichHenDieuTri from './customer/LichHenDieuTri'
import DieuTriThanhToan from './customer/DieuTriThanhToan'
import DieuTriThanhToanTheoLich from './customer/DieuTriThanhToanTheoLich'
import DieuTriTheoLich from './customer/DieuTriTheoLich'
import DanhSachAnhDieuTri from './customer/DanhSachAnhDieuTri'
import DanhSachAnhLichHen from './customer/DanhSachAnhLichHen'
import ThemAnhDieuTri from './customer/ThemAnhDieuTri'
import ThemAnhLichHen from './customer/ThemAnhLichHen'
import ThietLapDSDichVu from './system/ThietLapDSDichVu'


import ThietLapChanDoan from './system/ThietLapChanDoan'
import ThietLapNguonGioiThieu from './system/ThietLapNguonGioiThieu'
import ThietLapTienSuBenh from './system/ThietLapTienSuBenh'
import ThietLapNhomKhachHang from './system/ThietLapNhomKhachHang'
import LoaiQuangCao from './quangcao/LoaiQuangCao'
import SanPhamQuangCao from './quangcao/SanPhamQuangCao'
import QuangCao from './quangcao/QuangCao'

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
                <Route exact path='/tat-ca-khach-hang' component={AllCustomer} />
                <Route exact path='/lich-hen-tong'  component={LichHenTong} />
           
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
             
                <Route exact path='/tat-ca-khach-hang' component={AllCustomer} />
                <Route exact path='/lich-hen-tong'  component={LichHenTong} />
                <Route exact path='/thiet-lap-dich-vu' component={ThietLapDSDichVu} />
 
    
              
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