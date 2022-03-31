
import React, { Component } from "react";
import { Link } from 'react-router-dom'
import InHoaDon from "./InHoaDon";

class HoaDon extends Component {
    constructor (props) {
    super(props)
    this.state = {
            khachhang: [],
            chiphieu: [],
            thanhtoan: [],
            tongphaitra: '',
            tongdatra: '',
            tongconlai: '',
            idkhachhang: this.props.match.params.id,
            idkhammoi: this.props.match.params.idkm,
            idthanhtoan : this.props.match.params.idtt,
            tenchinhanh: ''
         
    }
}
    componentDidMount(){
        axios.get('/index.php/api/chitietkhachhang/'+this.state.idkhachhang).then(response => {
    
            this.setState({
              khachhang: response.data
            })
          
        })
        axios.get('/index.php/api/chitietthanhtoan/'+this.state.idthanhtoan)
     .then(response => {
   
      
        this.setState({
            thanhtoan: response.data
          })
          window.localStorage.setItem('tenchinhanh', response.data.chinhanhs.tenchinhanh);
		  window.localStorage.setItem('tenchinhanh', response.data.chinhanhs.tenchinhanh);
          window.localStorage.setItem('diachi', response.data.chinhanhs.diachi);
		  window.localStorage.setItem('sotienthanhtoan', response.data.tongtien);
          window.localStorage.setItem('ghichuthanhtoan', response.data.ghichu);
          if(response.data.hinhthucthanhtoan=="1")
          {
            window.localStorage.setItem('hinhthucthanhtoan', "Chuyển khoản");
          }
          else if(response.data.hinhthucthanhtoan=="2")
          {
            window.localStorage.setItem('hinhthucthanhtoan', "Tiền mặt");
          }
          else if(response.data.hinhthucthanhtoan=="3")
          {
            window.localStorage.setItem('hinhthucthanhtoan', "Dùng điểm tích lũy");
          }
		  else if(response.data.hinhthucthanhtoan=="4")
          {
            window.localStorage.setItem('hinhthucthanhtoan', "Chuyển khoản và tiền mặt");
          }
          else
          {
            window.localStorage.setItem('hinhthucthanhtoan', "Cà thẻ");
          }
     })
	 axios.get('/index.php/api/thanhtoan/'+this.state.idkhammoi)
     .then(response => {
   
      
        this.setState({
           lichsuthanhtoan: response.data
          })
          window.localStorage.setItem('lichsuthanhtoan', response.data);
          
     })
     axios.get('/index.php/api/thanhtoanthongke/'+this.state.idkhammoi).then(response => {
    
        var tcl=Number(response.data[0]["phaithanhtoan"])-Number(response.data[1]["dathanhtoan"])
        console.log(tcl)
            this.setState({
              tongphaitra: response.data[0]["phaithanhtoan"],
              tongdatra: response.data[1]["dathanhtoan"],
              tongconlai:tcl
            })
            
           
          
          })
       
   
    
    }


  render() {
   const { khachhang,thanhtoan,idkhammoi,idkhachhang,idthanhtoan,tongphaitra,tongdatra,tongconlai } = this.state
 
    return (
    <InHoaDon idkhachhang={idkhachhang} chitietthanhtoan={thanhtoan} tongphaitra={tongphaitra} tongdatra={tongdatra} tongconlai={tongconlai} idthanhtoan={idthanhtoan} idkhammoi={idkhammoi} khachhang={khachhang} />
  
    );
  }
}

export default HoaDon;