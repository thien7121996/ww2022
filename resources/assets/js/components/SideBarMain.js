import React, {Component} from 'react';
import { Link } from 'react-router-dom'

class SideBarMain extends Component {
  constructor () {
    super()
    this.state = {
      iduser: localStorage.getItem('userid'),
      usercurrent: []
    
  }
  this.handleOpenmenu = this.handleOpenmenu.bind(this)
}
  componentWillMount(){
    
    axios.get('/index.php/api/infouser/'+localStorage.getItem('userid')).then(response => {
      console.log(response.data)
      this.setState({
        usercurrent: response.data
      })
    })
    const scripts = [
      './public/app_assets/js/datatable/menu.js',
    
  ];
  const scripttag = document.getElementById("tagscripts");
  scripttag.innerHTML = '';
  scripts.forEach(s => {
    const script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = s;
    script.async = false
    scripttag.appendChild(script);
  })
  }
 
  componentDidMount() {
    const scripts = [
      './public/app_assets/js/datatable/menu.js',
    
  ];
  const scripttag = document.getElementById("tagscripts");
  scripttag.innerHTML = '';
  scripts.forEach(s => {
    const script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = s;
    script.async = false
    scripttag.appendChild(script);
  })

 
  }
  handleOpenmenu(e)
  {
    e.preventDefault()
    var element = document.getElementsByClassName("nav-second-level")
    for(var erm=0;erm<element.length;erm++)
    {
      element[erm].classList.remove("openmenu")
    }
   
    e.target.parentNode.querySelector('.nav-second-level').classList.add("openmenu")

  }
render(){
  const { iduser,usercurrent } = this.state
  return(
    <div className="navbar-default sidebar" role="navigation">
    <div className="sidebar-nav navbar-collapse slimscrollsidebar">
    {(() => {
            if (usercurrent.role==="1") {
              return (
                <ul className="nav" id="side-menu">
                <li className="sidebar-search hidden-sm hidden-md hidden-lg">
                  {/* input-group */}
                  <div className="input-group custom-search-form">
                    <input type="text" className="form-control" placeholder="Search..." /> <span className="input-group-btn">
                      <button className="btn btn-default" type="button"> <i className="fa fa-search" /> </button>
                    </span> </div>
                  {/* /input-group */}
                </li>
                <li className="user-pro">
                <a href='#' className="waves-effect"><img src="./public/app_assets/plugins/images/users/d1.jpg" alt="user-img" className="img-circle" /> <span className="hide-menu">{usercurrent.name}<span className="" /></span>
                  </a>
                
                </li>
                <li className="nav-small-cap m-t-10">--- Menu Chính</li>
              
                <li> <Link to='/tat-ca-khach-hang' className="waves-effect"><i className="icon-people p-r-10" /> <span className="hide-menu"> Khách hàng </span></Link>
             
                </li>
              
                <li> <Link to='/lich-hen-tong' className="waves-effect"><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> Lịch hẹn</span></Link>
                 
                 </li>
         
				 <li> <a href="#" onClick={this.handleOpenmenu} className="" aria-expanded="false"><i className="ti-server p-r-10" /> <span className="hide-menu">Giao việc<span className="fa arrow" /></span></a> 
                 <ul className="nav nav-second-level">
                
                        <li> <Link to='/giao-viec'>Quản lý giao việc</Link></li>   
                        <li> <Link to='/viec-giao'> Việc giao</Link></li>   
                         <li> <Link to='/viec-nhan'> Việc nhận</Link></li>     
						  <li> <Link to='/theo-doi'> Theo dõi</Link></li>     
                          </ul>
                 </li>
				 <li> <Link to='/quan-ly-khay' className="waves-effect"><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> Quản lý khay</span></Link>
                 
                 </li>
                 <li> <a href="#" onClick={this.handleOpenmenu} className="" aria-expanded="false"><i className="ti-server p-r-10" /> <span className="hide-menu">Bác sĩ<span className="fa arrow" /></span></a> 
                 <ul className="nav nav-second-level">
             
                        <li> <Link to='/doanh-thu-bac-si'>Doanh thu bác sĩ</Link></li>   
                        <li> <Link to='/hoa-hong-bac-si'> Hoa hồng bác sĩ</Link></li>   
                          
                          </ul>
                 </li>
                 
                 <li> <a href="#" onClick={this.handleOpenmenu} className="" aria-expanded="false"><i className="ti-server p-r-10" /> <span className="hide-menu">Sale<span className="fa arrow" /></span></a> 
                 <ul className="nav nav-second-level">
                
                        <li> <Link to='/doanh-thu-sale-online'>Doanh thu Sale Online</Link></li>   
                        <li> <Link to='/doanh-thu-direct-sale'> Doanh thu Direct Sale</Link></li>   
                        <li> <Link to='/hoa-hong-theo-sale-online'>Hoa hồng Sale Online</Link></li>   
                        <li> <Link to='/hoa-hong-theo-direct-sale'>Hoa hồng Direct Sale</Link></li>     
										
                          </ul>
                 </li>
                 
                 <li> <a href="#" onClick={this.handleOpenmenu} className="" aria-expanded="false"><i className="ti-server p-r-10" /> <span className="hide-menu">Doanh thu<span className="fa arrow" /></span></a> 
                 <ul className="nav nav-second-level">
                 <li> <Link to='/tong-quan-theo-thang'>Doanh thu trong tháng</Link> </li>
                       
                      <li> <Link to='/hoa-hong-gioi-thieu'>Doanh thu giới thiệu</Link></li>
                      <li> <Link to='/doanh-thu-nguon-cong-ty'>Thực thu</Link></li>  
					  	<li> <Link to='/doanh-thu-tung-ngay-trong-thang'>Doanh thu theo từng ngày trong tháng</Link></li>
<li> <Link to='/doanh-thu-theo-nguon'>Doanh thu theo nguồn</Link></li>   
<li> <Link to='/doanh-thu-theo-dich-vu'>Doanh thu theo dịch vụ</Link></li>    
<li> <Link to='/doanh-thu-theo-bac-si'>Doanh thu theo bác sĩ</Link></li>    
<li> <Link to='/doanh-thu-theo-tele-sale'>Doanh thu theo tele sale</Link></li>    	
<li> <Link to='/doanh-thu-theo-direct-sale'>Doanh thu theo direct sale</Link></li>  

 <li> <Link to='/bao-cao-bieu-do'>Báo cáo biểu đồ tổng quan</Link> </li>  
                          </ul>
                 </li>
                      
                      <li> <Link to='/bao-cao-khach-hang-den'>Báo cáo KH điều trị</Link></li>   
                        
                        <li> <a href="#" onClick={this.handleOpenmenu}  className="waves-effect"><i className="ti-rss-alt p-r-10" /> <span className="hide-menu">Quảng cáo<span className="fa arrow" /></span></a> 
                        <ul className="nav nav-second-level">
                            
                            <li> <Link to='/quang-cao'>Quảng cáo</Link> </li>
                            <li> <Link to='/bieu-do-quang-cao'>Biểu đồ tổng quan</Link> </li>
                          </ul>
                        </li>
                        <li> <a href="#" onClick={this.handleOpenmenu}  className="waves-effect"><i className="ti-rss-alt p-r-10" /> <span className="hide-menu">CSKH<span className="fa arrow" /></span></a> 
                        <ul className="nav nav-second-level">
                            
                            <li> <Link to='/quan-ly-benh-ly-hoan-thanh'>Khách hoàn thành</Link> </li>
                            <li> <Link to='/lich-hen-cskh'>Lịch hẹn</Link> </li>
							<li> <Link to='/nhac-nho-hoan-thanh'>Chăm sóc lại</Link> </li>
              <li> <Link to='/quan-ly-benh-ly'>Quản lý bệnh lý</Link> </li>
                          </ul>
                        </li>
                        <li> <a href="#" onClick={this.handleOpenmenu}  className="waves-effect" aria-expanded="false"><i className="ti-dashboard p-r-10" /> <span className="hide-menu">Thiết lập hệ thống<span className="fa arrow" /></span></a> 
                        <ul className="nav nav-second-level collapse in" aria-expanded="false">
                        <li> <Link to='/thiet-lap-chan-doan'>Thiết lập bệnh lý</Link></li>
                            <li> <Link to='/thiet-lap-dich-vu'>Thiết lập dịch vụ</Link> </li>
                            <li> <Link to='/thiet-lap-dieu-tri'>Thiết lập điều trị</Link> </li>
                          
                           
                            <li> <Link to='/thiet-lap-nguon-gioi-thieu'>Thiết lập giới thiệu</Link></li>
                            <li> <Link to='/thiet-lap-tien-su-benh'>Thiết lập tiền sử bệnh</Link></li>
                            <li> <Link to='/thiet-lap-chi-nhanh'>Thiết lập chi nhánh</Link></li>
                            <li> <Link to='/loai-quang-cao'>Loại quảng cáo</Link></li>
                            <li> <Link to='/san-pham-quang-cao'>Sản phẩm quảng cáo</Link> </li>
                            <li> <Link to='/cap-do'>Thiết lập cấp độ</Link></li>
                           
                            <li> <Link to='/lich-su-chinh-sua'>Lịch sử chỉnh sửa</Link></li>
                            <li> <Link to='/tat-ca-bac-si'>Bác sĩ</Link> </li>
                            <li> <Link to='/tai-khoan'>Tài khoản</Link> </li>
                            <li> <Link to='/role'>Role</Link> </li>
                          </ul>
                        </li>
                
              
              </ul>
              )
              }
              else if (usercurrent.role==="3") {
                return (
                  <ul className="nav" id="side-menu">
                  <li className="sidebar-search hidden-sm hidden-md hidden-lg">
                    {/* input-group */}
                    <div className="input-group custom-search-form">
                      <input type="text" className="form-control" placeholder="Search..." /> <span className="input-group-btn">
                        <button className="btn btn-default" type="button"> <i className="fa fa-search" /> </button>
                      </span> </div>
                    {/* /input-group */}
                  </li>
                  <li className="user-pro">
                  <a href='#' className="waves-effect"><img src="./public/app_assets/plugins/images/users/d1.jpg" alt="user-img" className="img-circle" /> <span className="hide-menu">{usercurrent.name}<span className="" /></span>
                    </a>
                  
                  </li>
                  <li className="nav-small-cap m-t-10">--- Menu Chính</li>
                
             
                  <li> <Link to='/lich-hen-tong' className="waves-effect"><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> Lịch hẹn</span></Link>
                   
                   </li>
                   <li> <a href="#" onClick={this.handleOpenmenu} className="" aria-expanded="false"><i className="ti-server p-r-10" /> <span className="hide-menu">Bác sĩ<span className="fa arrow" /></span></a> 
                 <ul className="nav nav-second-level">
                
                        <li> <Link to='/doanh-thu-theo-bac-si'>Doanh thu bác sĩ</Link></li>   
                        <li> <Link to='/hoa-hong-theo-bac-si'> Hoa hồng bác sĩ</Link></li>   
                          
                          </ul>
                 </li>
				 
                  <li> <a href="#" onClick={this.handleOpenmenu} className="" aria-expanded="false"><i className="ti-server p-r-10" /> <span className="hide-menu">Giao việc<span className="fa arrow" /></span></a> 
                 <ul className="nav nav-second-level">
                
                     
                        <li> <Link to='/viec-giao'> Việc giao</Link></li>   
                         <li> <Link to='/viec-nhan'> Việc nhận</Link></li>     
						  <li> <Link to='/theo-doi'> Theo dõi</Link></li>     
                          </ul>
                 </li>  
                      
                      
                    
                  
                
                </ul>
                )
                }
                else if (usercurrent.role==="6") {
                  return (
                    <ul className="nav" id="side-menu">
                    <li className="sidebar-search hidden-sm hidden-md hidden-lg">
                      {/* input-group */}
                      <div className="input-group custom-search-form">
                        <input type="text" className="form-control" placeholder="Search..." /> <span className="input-group-btn">
                          <button className="btn btn-default" type="button"> <i className="fa fa-search" /> </button>
                        </span> </div>
                      {/* /input-group */}
                    </li>
                    <li className="user-pro">
                    <a href='#' className="waves-effect"><img src="./public/app_assets/plugins/images/users/d1.jpg" alt="user-img" className="img-circle" /> <span className="hide-menu">{usercurrent.name}<span className="" /></span>
                      </a>
                    
                    </li>
                    <li className="nav-small-cap m-t-10">--- Menu Chính</li>
                  
                    <li> <Link to='/tat-ca-khach-hang' className="waves-effect"><i className="icon-people p-r-10" /> <span className="hide-menu"> Khách hàng </span></Link>
                 
                    </li>
                  
                    <li> <Link to='/lich-hen-tong' className="waves-effect"><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> Lịch hẹn</span></Link>
                     
                     </li>
                     
                     <li> <a href="#" onClick={this.handleOpenmenu} className="" aria-expanded="false"><i className="ti-server p-r-10" /> <span className="hide-menu">Bác sĩ<span className="fa arrow" /></span></a> 
                     <ul className="nav nav-second-level">
                    
                            <li> <Link to='/doanh-thu-bac-si'>Doanh thu bác sĩ</Link></li>   
                          
                              
                              </ul>
                     </li>
                     <li> <a href="#" onClick={this.handleOpenmenu} className="" aria-expanded="false"><i className="ti-server p-r-10" /> <span className="hide-menu">Doanh thu<span className="fa arrow" /></span></a> 
                     <ul className="nav nav-second-level">
                     <li> <Link to='/tong-quan-theo-thang'>Doanh thu trong tháng</Link> </li>
                           
                          
                              
                              </ul>
                     </li>
					   <li> <Link to='/quan-ly-benh-ly'>Quản lý bệnh lý</Link> </li>
                       <li> <a href="#" onClick={this.handleOpenmenu} className="" aria-expanded="false"><i className="ti-server p-r-10" /> <span className="hide-menu">Giao việc<span className="fa arrow" /></span></a> 
                 <ul className="nav nav-second-level">
                
                     
                        <li> <Link to='/viec-giao'> Việc giao</Link></li>   
                         <li> <Link to='/viec-nhan'> Việc nhận</Link></li>     
						  <li> <Link to='/theo-doi'> Theo dõi</Link></li>     
                          </ul>
                 </li>  
                            
                            
                            <li> <a href="#" onClick={this.handleOpenmenu}  className="waves-effect"><i className="ti-rss-alt p-r-10" /> <span className="hide-menu">Quảng cáo<span className="fa arrow" /></span></a> 
                            <ul className="nav nav-second-level">
                                
                                <li> <Link to='/quang-cao'>Quảng cáo</Link> </li>
                                <li> <Link to='/bieu-do-quang-cao'>Biểu đồ tổng quan</Link> </li>
                              </ul>
                            </li>
                            <li> <a href="#" onClick={this.handleOpenmenu}  className="waves-effect"><i className="ti-rss-alt p-r-10" /> <span className="hide-menu">CSKH<span className="fa arrow" /></span></a> 
                            <ul className="nav nav-second-level">
                                
                                <li> <Link to='/quan-ly-benh-ly-hoan-thanh'>Khách hoàn thành</Link> </li>
                                <li> <Link to='/lich-hen-cskh'>Lịch hẹn</Link> </li>
								<li> <Link to='/nhac-nho-hoan-thanh'>Chăm sóc lại</Link> </li>
							  </ul>
                            </li>
                         
                    
                  
                  </ul>
                  )
                  }
                else if (usercurrent.role==="4") {
                  return (
                    <ul className="nav" id="side-menu">
                    <li className="sidebar-search hidden-sm hidden-md hidden-lg">
                      {/* input-group */}
                      <div className="input-group custom-search-form">
                        <input type="text" className="form-control" placeholder="Search..." /> <span className="input-group-btn">
                          <button className="btn btn-default" type="button"> <i className="fa fa-search" /> </button>
                        </span> </div>
                      {/* /input-group */}
                    </li>
                    <li className="user-pro">
                    <a href='#' className="waves-effect"><img src="./public/app_assets/plugins/images/users/d1.jpg" alt="user-img" className="img-circle" /> <span className="hide-menu">{usercurrent.name}<span className="" /></span>
                      </a>
                    
                    </li>
                    <li className="nav-small-cap m-t-10">--- Menu Chính</li>
                  
                    <li> <Link to='/tat-ca-khach-hang' className="waves-effect"><i className="icon-people p-r-10" /> <span className="hide-menu"> Khách hàng </span></Link></li>
                   
                   
                     <li> <Link to='/lich-hen-tong' className="waves-effect"><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> Lịch hẹn tổng</span></Link></li>
                      <li> <Link to='doanh-thu-bac-si' className="waves-effect"><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> Doanh thu bác sĩ</span></Link>
                     
                     </li>
                     <li> <a href="#" onClick={this.handleOpenmenu} className="" aria-expanded="false"><i className="ti-server p-r-10" /> <span className="hide-menu">Doanh thu<span className="fa arrow" /></span></a> 
                     <ul className="nav nav-second-level">
                     <li> <Link to='/tong-quan-theo-thang'>Doanh thu trong tháng</Link> </li>
                           
                          
                              
                              </ul>
                     </li>
					  <li> <Link to='/bao-cao-doanh-thu-sale-leader'><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> Doanh thu sale cấp dưới</span></Link> </li>
                     <li> <a href="#" onClick={this.handleOpenmenu}  className="waves-effect"><i className="ti-rss-alt p-r-10" /> <span className="hide-menu">CSKH<span className="fa arrow" /></span></a> 
                            <ul className="nav nav-second-level">
                                
                                <li> <Link to='/quan-ly-benh-ly-hoan-thanh'>Khách hoàn thành</Link> </li>
                                <li> <Link to='/lich-hen-cskh'>Lịch hẹn</Link> </li>
								<li> <Link to='/nhac-nho-hoan-thanh'>Chăm sóc lại</Link> </li>
                
						   </ul>
                     </li>
                     <li> <Link to='/hoa-hong-theo-sale' className="waves-effect"><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> Báo cáo hoa hồng</span></Link>
                     
                     </li>
                      <li> <a href="#" onClick={this.handleOpenmenu} className="" aria-expanded="false"><i className="ti-server p-r-10" /> <span className="hide-menu">Giao việc<span className="fa arrow" /></span></a> 
                 <ul className="nav nav-second-level">
                
                     
                        <li> <Link to='/viec-giao'> Việc giao</Link></li>   
                         <li> <Link to='/viec-nhan'> Việc nhận</Link></li>     
						  <li> <Link to='/theo-doi'> Theo dõi</Link></li>     
                          </ul>
                 </li>  
                        
                      
                    
                  
                  </ul>
                  )
                  }
                  else if (usercurrent.role==="5") {
                    return (
                      <ul className="nav" id="side-menu">
                      <li className="sidebar-search hidden-sm hidden-md hidden-lg">
                        {/* input-group */}
                        <div className="input-group custom-search-form">
                          <input type="text" className="form-control" placeholder="Search..." /> <span className="input-group-btn">
                            <button className="btn btn-default" type="button"> <i className="fa fa-search" /> </button>
                          </span> </div>
                        {/* /input-group */}
                      </li>
                      <li className="user-pro">
                      <a href='#' className="waves-effect"><img src="./public/app_assets/plugins/images/users/d1.jpg" alt="user-img" className="img-circle" /> <span className="hide-menu">{usercurrent.name}<span className="" /></span>
                        </a>
                      
                      </li>
                      <li className="nav-small-cap m-t-10">--- Menu Chính</li>
                    
                      <li> <Link to='/tat-ca-khach-hang' className="waves-effect"><i className="icon-people p-r-10" /> <span className="hide-menu"> Khách hàng </span></Link></li>
                      <li> <Link to='/lich-hen-tong' className="waves-effect"><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> Lịch hẹn tổng</span></Link></li>
                      <li> <Link to='doanh-thu-bac-si' className="waves-effect"><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> Doanh thu bác sĩ</span></Link>
                     
                     </li>
                     <li> <a href="#" onClick={this.handleOpenmenu} className="" aria-expanded="false"><i className="ti-server p-r-10" /> <span className="hide-menu">Doanh thu<span className="fa arrow" /></span></a> 
                     <ul className="nav nav-second-level">
                     <li> <Link to='/tong-quan-theo-thang'>Doanh thu trong tháng</Link> </li>
                           
                          
                              
                              </ul>
                     </li>
					
					      <li> <Link to='/bao-cao-doanh-thu-sale-leader'><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> Doanh thu sale cấp dưới</span></Link> </li>
           <li> <Link to='/quan-ly-benh-ly'>Quản lý bệnh lý</Link> </li>
                       <li> <Link to='/hoa-hong-theo-direct-sale' className="waves-effect"><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> Báo cáo hoa hồng</span></Link>
                       
                       </li>
                       <li> <a href="#" onClick={this.handleOpenmenu} className="" aria-expanded="false"><i className="ti-server p-r-10" /> <span className="hide-menu">Giao việc<span className="fa arrow" /></span></a> 
                 <ul className="nav nav-second-level">
                
                     
                        <li> <Link to='/viec-giao'> Việc giao</Link></li>   
                         <li> <Link to='/viec-nhan'> Việc nhận</Link></li>     
						  <li> <Link to='/theo-doi'> Theo dõi</Link></li>     
                          </ul>
                 </li>  
                          
                        
                      
                    
                    </ul>
                    )
                    }
                    else if (usercurrent.role==="7") {
                      return (
                        <ul className="nav" id="side-menu">
                        <li className="sidebar-search hidden-sm hidden-md hidden-lg">
                          {/* input-group */}
                          <div className="input-group custom-search-form">
                            <input type="text" className="form-control" placeholder="Search..." /> <span className="input-group-btn">
                              <button className="btn btn-default" type="button"> <i className="fa fa-search" /> </button>
                            </span> </div>
                          {/* /input-group */}
                        </li>
                        <li className="user-pro">
                        <a href='#' className="waves-effect"><img src="./public/app_assets/plugins/images/users/d1.jpg" alt="user-img" className="img-circle" /> <span className="hide-menu">{usercurrent.name}<span className="" /></span>
                          </a>
                        
                        </li>
                        <li className="nav-small-cap m-t-10">--- Menu Chính</li>
                      
                        <li> <Link to='/doanh-thu-nguon-theo-cong-ty' className="waves-effect"><i className="icon-people p-r-10" /> <span className="hide-menu"> Doanh thu </span></Link></li>
                       
                        <li> <Link to='/hoa-hong-theo-nguon-cong-ty' className="waves-effect"><i className="icon-people p-r-10" /> <span className="hide-menu"> Thực thu </span></Link></li>    
                            
                          <li> <Link to='/lich-hen-theo-cong-ty' className="waves-effect"><i className="icon-people p-r-10" /> <span className="hide-menu"> Lịch hẹn </span></Link></li>    
                          <li> <a href="#" onClick={this.handleOpenmenu} className="" aria-expanded="false"><i className="ti-server p-r-10" /> <span className="hide-menu">Giao việc<span className="fa arrow" /></span></a> 
                 <ul className="nav nav-second-level">
                
                     
                        <li> <Link to='/viec-giao'> Việc giao</Link></li>   
                         <li> <Link to='/viec-nhan'> Việc nhận</Link></li>     
						  <li> <Link to='/theo-doi'> Theo dõi</Link></li>     
                          </ul>
                 </li>  
                      
                      </ul>
                      )
                      }
              else
              {
                return(
                  <ul className="nav" id="side-menu">
                  <li className="sidebar-search hidden-sm hidden-md hidden-lg">
                    {/* input-group */}
                    <div className="input-group custom-search-form">
                      <input type="text" className="form-control" placeholder="Search..." /> <span className="input-group-btn">
                        <button className="btn btn-default" type="button"> <i className="fa fa-search" /> </button>
                      </span> </div>
                    {/* /input-group */}
                  </li>
                  <li className="user-pro">
                  <a href='#' className="waves-effect"><img src="./public/app_assets/plugins/images/users/d1.jpg" alt="user-img" className="img-circle" /> <span className="hide-menu">{usercurrent.name}<span className="" /></span>
                    </a>
                  
                  </li>
                  <li className="nav-small-cap m-t-10">--- Menu Chính</li>
                  <li> <Link to='doanh-thu-bac-si' className="waves-effect"><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> Doanh thu bác sĩ</span></Link>
                     
                     </li>
                  <li> <Link to='/tat-ca-khach-hang' className="waves-effect"><i className="icon-people p-r-10" /> <span className="hide-menu"> Khách hàng </span></Link>
               
                  </li>
              
                  <li> <Link to='/lich-hen-tong' className="waves-effect"><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> Lịch hẹn</span></Link>
                 
                 </li>
                    
                   <li> <a href="#" onClick={this.handleOpenmenu} className="" aria-expanded="false"><i className="ti-server p-r-10" /> <span className="hide-menu">Giao việc<span className="fa arrow" /></span></a> 
                 <ul className="nav nav-second-level">
                
                     
                        <li> <Link to='/viec-giao'> Việc giao</Link></li>   
                         <li> <Link to='/viec-nhan'> Việc nhận</Link></li>     
						  <li> <Link to='/theo-doi'> Theo dõi</Link></li>     
                          </ul>
                 </li>       
                   
                      
                    
                  
                
                </ul>
                )
              }
          })()}
 
    </div>
  </div>
  )
}
}
       
      
    

    export default SideBarMain