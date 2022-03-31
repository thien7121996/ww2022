
import React, { Component } from "react";
import { Link } from 'react-router-dom'
import BangInThanhToan from "./PrintThanhToan";

class HoaDonThanhToan extends Component {
    constructor (props) {
    super(props)
    this.state = {
            quatrinhdieutrilist: [],
            ketquadieutrilist: [],
            khachhang: [],
            chitietphieudieutri: [],
            idphieudieuchi: this.props.match.params.id,
            idkhachhang: this.props.match.params.idkh,
            idlich : this.props.match.params.idlich,
            tendichvu: ''
    }
}
    componentDidMount(){
 
        axios.get('/index.php/api/quatrinhdieutrikhachhang/'+this.state.idphieudieuchi).then(response => {
        
            this.setState({
              quatrinhdieutrilist: response.data
            })
        
           
          })
          axios.get('/index.php/api/ketquadieutrikhachhang/'+this.state.idphieudieuchi).then(response => {
    
            this.setState({
              ketquadieutrilist: response.data
            })
        
           
          })
          axios.get('/index.php/api/chitietkhachhang/'+this.state.idkhachhang).then(response => {
    
            this.setState({
              khachhang: response.data
            })
          
        })
        axios.get('/index.php/api/phieudieutri/'+this.state.idphieudieuchi).then(response => {
    
          this.setState({
            chitietphieudieutri: response.data
          })
        
      })
      axios.get('/index.php/api/lichlamviecchitiet/'+this.state.idlich).then(response => {
    
        axios.get('/index.php/api/dichvudetail/'+response.data.dichvu).then(response => {
          this.setState({
            tendichvu: response.data.ten
          })
        })
    
       
      })
    
    }


  render() {
   const { khachhang,ketquadieutrilist,quatrinhdieutrilist,idkhachhang,idphieudieuchi,chitietphieudieutri,tendichvu } = this.state
 
    return (
    <BangInThanhToan idkhachhang={idkhachhang} chitietphieudieutri={chitietphieudieutri} tendichvu={tendichvu} idphieudieuchi={idphieudieuchi} khachhang={khachhang} ketquadieutrilist={ketquadieutrilist} quatrinhdieutrilist={quatrinhdieutrilist} />
  
    );
  }
}

export default HoaDonThanhToan;