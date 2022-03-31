import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactToPrint from 'react-to-print'
import moment from "moment"
class ComponentToPrint extends Component {
 
    render() {
      const thongtinkhachhang=this.props.datakhachhang
      const dichvu=this.props.dichvudieutri
      const tiensu=this.props.tiensubenh
      const nguon=this.props.nguongioithieu
      const benhly=this.props.benhly
      const benhlyds=this.props.benhlyds
      const chinhanh=this.props.chinhanh
      const ghichutext=this.props.ghichutext
      var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
      return (
<div className="col-md-12">

  <style>
    {"@media all{.page-break{display:none}}@media print{html,body{height:initial!important;overflow:initial!important;-webkit-print-color-adjust:exact !important}}@media print{.page-break{margin-top:1rem;display:block;page-break-before:auto}}@page{size:auto;margin:20mm} .GOK0K1ECHIB{min-height:26.8px;background-color:rgb(221, 221, 221);padding:5px 0;border-radius:2px;box-sizing:border-box; -webkit-print-color-adjust: exact !important;}}"}
  </style>
<style>
    {".GOK0K1ECBIB{max-width:auto;font-size:14px;color:#000; padding: 20px 0px;}.GOK0K1ECGIB{display:flex;flex-flow:row wrap;margin-left:-10px;margin-right:-10px;align-items:center;min-height:24px;margin-top:10px}.GOK0K1ECGIB>*{box-sizing:border-box;margin:3px 10px;min-width:150px;flex-basis:150px;flex-grow:1}.GOK0K1ECHIB{min-height:26.8px;background-color:rgb(221, 221, 221);padding:5px 0;border-radius:2px;box-sizing:border-box}.GOK0K1ECDIB{width:90px;font-weight:600;margin-top:5px}"}
  </style>
  <style>
    {".GOK0K1ECLS{font-size:13px;color:#727173;position:relative}.GOK0K1ECMS{display:flex;flex-flow:row wrap;flex-direction:row;flex-wrap:wrap;background-color:#f9f9f9;padding-top:5px;padding-bottom:5px;border-bottom:1px #ddd solid}.GOK0K1ECMS>*{margin-top:5px;margin-bottom:5px;margin-left:10px;margin-right:10px}.GOK0K1ECES{white-space:nowrap;width:90px;line-height:28px;text-align:center}.GOK0K1ECIS{padding-left:10px;padding-right:10px;border-style:solid;height:36px}.GOK0K1ECKS{margin-right:3px}.GOK0K1ECJS{margin-left:3px}.GOK0K1ECET{text-align:right;position:absolute;top:0;bottom:0;left:9px;line-height:36px;pointer-events:none}.GOK0K1ECFS{flex-grow:10000}.GOK0K1ECFS input[type='search']:LAST-CHILD{width:100%!important}.GOK0K1ECNS{border-top:1px #ddd solid}.GOK0K1ECDS{display:flex;flex-flow:row nowrap;padding-top:43px;padding-left:43px}.GOK0K1ECDS>*{flex-grow:1;border-right:1px #000 solid;flex-basis:1px}.GOK0K1ECDS>:LAST-CHILD{border-right:none}.GOK0K1ECHS{width:40px;min-width:40px;flex-basis:40px;position:absolute;left:0;z-index:2;background:#fff;font-weight:100;text-align:right;top:43px}.GOK0K1ECHS>*{display:block;height:40px;margin:0 0 1px 0;padding:5px 3px;box-sizing:border-box;border-bottom:1px solid #f9f9f9;box-shadow:1px 0 0 0 rgba(121,121,121,.21)}.GOK0K1ECGS{position:absolute;top:0;left:0;right:0;z-index:2;padding-left:43px;background-color:#f4f5f7;display:flex;flex-flow:row nowrap}.GOK0K1ECGS>*{flex-grow:1;border-right:1px #000 solid;flex-basis:1px}.GOK0K1ECGS>:LAST-CHILD{border-right:none}.GOK0K1ECDT{position:absolute;top:0;left:0;z-index:2;width:43px;height:40px;display:block;text-align:center;font-weight:600;background-color:#f4f5f7;padding-top:11px;box-sizing:border-box}.GOK0K1ECPS{position:absolute;width:0;height:0;z-index:2000000000;top:50%;left:50%}.GOK0K1ECCT{display:flex}.GOK0K1ECCT input{display:none}.GOK0K1ECCT label{display:flex;align-items:center;padding-left:20px;padding-right:20px;cursor:pointer;box-sizing:border-box;white-space:nowrap;background-color:#f1f1f1;border:1px solid #ccc;border-left:none}.GOK0K1ECCT label:hover,.GOK0K1ECCT input:checked+label{color:#0272b5;background-color:#fff}.GOK0K1ECCT:FIRST-CHILD label{border-left:1px solid #ccc;border-top-left-radius:2px;border-bottom-left-radius:2px}.GOK0K1ECCT:LAST-CHILD label{border-top-right-radius:2px;border-bottom-right-radius:2px}.GOK0K1ECCS{position:fixed;right:36px;bottom:23px;width:48px;height:48px;line-height:48px;padding:0;padding-top:8px;border:none;border-radius:50%;box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)}.GOK0K1ECCS:HOVER{box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15)}.GOK0K1ECOS{border-top:1px #ddd solid}.GOK0K1ECOS>div,.GOK0K1ECOS>div>div{min-height:100%;display:flex;flex-flow:row nowrap;min-width:100%;flex-grow:1}.GOK0K1ECAT{display:flex;flex-flow:row nowrap;flex-grow:1;padding-top:42px}.GOK0K1ECAT>*{min-height:100%;background:#f4f5f7;flex-basis:150px;min-width:150px;width:150px;flex-grow:1;margin:0 2px 0 2px;padding:10px;box-sizing:border-box}.GOK0K1ECBT{position:absolute;top:0;left:0;right:0;margin-top:0;min-height:40px;text-transform:uppercase;display:flex;flex-flow:row nowrap;flex-grow:1}.GOK0K1ECBT>*{box-shadow:0 1px 0 0 rgba(121,121,121,.21);font-weight:600;background:#f4f5f7;flex-basis:150px;min-width:150px;width:150px;flex-grow:1;margin:0 2px 0 2px;padding:10px;padding-top:13px;box-sizing:border-box}"}
  </style>
  <style>
    {".GOK0K1ECOJB{display:flex;flex-flow:row nowrap;margin:0 0 1px 0;position:relative;height:40px;}.GOK0K1ECOJB>*{min-height:40px;background:#f4f5f7;flex-basis:60px;min-width:60px;flex-grow:1;margin:0 1px 0 1px;padding:5px 3px;box-sizing:border-box;position:relative;display:flex;flex-flow:row nowrap;align-items:flex-start;}.GOK0K1ECOJB[staffNameRow='true']{display:flex;flex-flow:column nowrap;background-color:white;margin:0;}.GOK0K1ECMJB{min-height:19px;margin-bottom:1px;padding-top:2px;display:block;text-align:center;}.GOK0K1ECNJB{display:flex;flex-flow:row nowrap;padding:0;background:white;min-height:20px;margin:0;}.GOK0K1ECNJB>*{background:white;flex-basis:60px;min-width:60px;flex-grow:1;margin:0 1px 0 1px;padding:2px 3px;box-sizing:border-box;box-shadow:0 1px 0 0 rgba(121, 121, 121, 0.21);font-weight:600;font-size:12px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:block;width:1px;text-transform:capitalize;}"}
  </style>
  <style>
    {".GOK0K1ECER{display:flex;flex-flow:row wrap;flex-direction:row;flex-wrap:wrap;background-color:#f9f9f9;padding-top:5px;padding-bottom:5px;align-items:center;}.GOK0K1ECER>*{margin-top:5px;margin-bottom:5px;margin-left:10px;margin-right:10px;font-size:12px !important;}.GOK0K1ECFR{display:flex;flex-flow:row wrap;flex-direction:row;flex-wrap:wrap;background-color:#f9f9f9;margin-left:-5px;margin-right:-5px;}.GOK0K1ECFR>*{white-space:nowrap;margin-top:5px;margin-bottom:5px;margin-left:5px;margin-right:5px;font-size:12px !important;}.GOK0K1ECMQ{font-size:12px !important;padding:0 6px;height:30px;box-sizing:border-box;border-radius:2px;border:1px solid #ccc;line-height:32px;}.GOK0K1ECBR{margin-left:10px;margin-right:10px;padding-bottom:10px;}.GOK0K1ECGR{border-radius:2px;border:1px solid #ddd;}.GOK0K1ECJQ{display:flex;flex-flow:row nowrap;align-items:center;white-space:nowrap;font-size:12px;}.GOK0K1ECAR{padding-left:5px;padding-right:5px;box-sizing:border-box;white-space:nowrap;border:1px solid #ccc;border-radius:2px;height:30px;font-size:12px !important;}.GOK0K1ECOQ{padding-left:10px;padding-right:10px;height:30px;}.GOK0K1ECDR{border-top-right-radius:0;border-bottom-right-radius:0;margin-left:10px;}.GOK0K1ECCR{border-top-left-radius:0;border-bottom-left-radius:0;}.GOK0K1ECIR{display:flex;flex-flow:row wrap;align-items:center;font-size:10px;}.GOK0K1ECLQ{font-size:10px;margin-left:10px;padding-top:10px;padding-bottom:10px;white-space:nowrap;}.GOK0K1ECPQ{text-transform:uppercase;}.GOK0K1ECHR{position:fixed;width:0;height:0;z-index:2000000000;top:103px;left:50%;}.GOK0K1ECNQ{border-radius:0;border-left:none;border-right:none;}.GOK0K1ECJR{border-radius:0;border-left:none;border-right:none;text-align:right;}.GOK0K1ECKQ{display:flex;flex-flow:row nowrap;align-items:center;}.GOK0K1ECE3{display:flex;flex-direction:row;flex-wrap:nowrap;border-left:1px #ddd solid;}.GOK0K1ECE3[odd='true']>*{background-color:#fdfdfd;}.GOK0K1ECE3:HOVER>*,.GOK0K1ECE3[odd='true']:HOVER>*{background-color:#f8fff8;}.GOK0K1ECE3[header='true']:HOVER>*{background-color:#eee;}.GOK0K1ECE3>*{padding-left:5px;padding-right:5px;padding-top:10px;padding-bottom:10px;border-right:1px #ddd solid;border-bottom:1px #ddd solid;box-sizing:border-box;flex-grow:0;flex-shrink:0;word-break:break-word;font-size:12px !important;line-height:1.5;font-weight:300;}.GOK0K1ECE3[header='true']>*{padding-top:5px;padding-bottom:5px;border-top:1px #ddd solid;background-color:#eee;font-weight:bold;text-transform:none;line-height:2;}.GOK0K1ECD3{min-width:75px;flex-basis:75px;flex-grow:1;}.GOK0K1ECB3{min-width:180px;flex-basis:180px;flex-grow:10;text-transform:capitalize;}.GOK0K1ECE3[header='true']>.GOK0K1ECB3{text-transform:none;}.GOK0K1ECP2{min-width:75px;flex-basis:75px;}.GOK0K1ECC3{min-width:150px;flex-basis:150px;flex-grow:1;}.GOK0K1ECA3{min-width:100px;flex-basis:100px;}.GOK0K1ECN2{min-width:170px;flex-basis:170px;}.GOK0K1ECM2{min-width:58px;padding:0 !important;display:flex;justify-content:center;}.GOK0K1ECO2{font-size:11px;min-width:26px;height:26px;padding:0;font-weight:300;border-radius:100%;box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;margin-top:5px;margin-left:2px;}"}
  </style>
  <style>
    {".GOK0K1ECALB{z-index:2;}.GOK0K1ECFLB{border-spacing:7px;font-style:italic;margin-left:-7px;width:100%;}.GOK0K1ECJLB{padding:8px 14px;}.GOK0K1ECGLB{font-style:italic;color:#bbb;margin-top:20px;margin-bottom:-8px;margin-left:140px;font-size:13px;font-weight:300;}.GOK0K1ECKLB{display:flex;flex-flow:row wrap;margin-left:-10px;margin-right:-10px;}.GOK0K1ECKLB>*{flex-grow:1;flex-basis:200px;min-width:200px;margin:10px;}.GOK0K1ECBLB{display:flex;flex-flow:row nowrap;align-items:center;}.GOK0K1ECCLB{min-width:137px;font-weight:600;}.GOK0K1ECDLB{min-width:80px;font-weight:600;margin-left:20px;display:flex;align-items:center;}.GOK0K1ECELB{flex-grow:1;font-weight:300;}textarea.GOK0K1ECELB{padding:7px;resize:vertical;line-height:1.5;}.GOK0K1ECILB{text-transform:uppercase;font-weight:300;}.GOK0K1ECPKB{color:#ed5564;}.GOK0K1ECPKB:HOVER{color:red;background-color:rgba(255, 255, 255, 0.95);}.GOK0K1ECNKB{height:34px;padding:4px;}.GOK0K1ECOKB{width:24px;height:24px;padding:0;border-radius:50%;font-size:12px;margin-left:5px;color:#777;border:none;}.GOK0K1ECELB>option{font-weight:300;}.GOK0K1ECHLB{text-transform:lowercase;}"}
  </style>
  <style>
    {".GOK0K1ECGM{z-index:2;position:fixed !important;}.GOK0K1ECHM{min-width:100px;padding:15px;box-sizing:border-box;border-radius:4px;box-shadow:0 2px 4px 0 rgba(0, 0, 0, 0.5);font-size:13px;line-height:1.5;border-left:2px solid #62cb31;background-color:#f1f9ef;}.GOK0K1ECFM{border:none;background:none;position:absolute;right:-10px;top:-10px;padding:0;height:23px;width:23px;border-radius:100%;background-color:#fff;box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.22);}.GOK0K1ECFM:HOVER{background-color:#f7f9fa;}"}
  </style>
  <style>
    {".GOK0K1ECFV{background-color:white;top:0;left:0;bottom:0;right:0;z-index:2;}.GOK0K1ECGV{box-sizing:border-box;height:60px;background-color:#fff;-webkit-box-shadow:0 1px 5px 0 rgba(121, 121, 121, 0.21);box-shadow:0 1px 5px 0 rgba(121, 121, 121, 0.21);display:flex;flex-direction:row;flex-wrap:nowrap;padding-left:20px;padding-right:25px;align-items:center;justify-content:space-between;min-width:980px;}.GOK0K1ECHV{display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:flex-end;align-items:center;min-width:100px;}.GOK0K1ECHV>*{margin:5px;font-size:14px;}.GOK0K1ECEV{padding-left:1.5625%;padding-right:1.5625%;min-height:100%;box-sizing:border-box;min-width:980px;display:flex;flex-flow:column;height:100%;}.GOK0K1ECIV{padding:8px;min-width:40px;border:none;background:none;}.GOK0K1ECIV:HOVER{background-color:#f7f9fa;}.GOK0K1ECDV{color:#ed5564;}.GOK0K1ECCV{flex-basis:28px;min-width:40px;height:40px;border:none;background:none;padding:0;border-radius:2px;}.GOK0K1ECCV:HOVER{background-color:#f7f9fa;}.GOK0K1ECKV{display:flex;flex-flow:row nowrap;justify-content:center;align-self:flex-end;}.GOK0K1ECJV{cursor:pointer;margin-right:30px;}.GOK0K1ECJV input{display:none;}.GOK0K1ECJV label{color:#727173;font-size:18px;font-weight:300;padding-top:0;padding-bottom:4px;margin-bottom:0;border-bottom:2px transparent solid;cursor:pointer;display:inline-block;white-space:nowrap;user-select:none;}.GOK0K1ECJV input:checked+label{border-bottom:2px #3498db solid;color:#111;}.GOK0K1ECJV label:hover{border-bottom:2px #3498db solid;}.GOK0K1ECI2{color:black;font-weight:300;padding-bottom:70px;}.GOK0K1ECP1{border-spacing:7px;font-style:italic;}.GOK0K1ECE1{flex-grow:0;flex-shrink:0;flex-basis:110px;min-width:300px;margin-bottom:20px;border-radius:2px;border:1px solid #ddd;}.GOK0K1ECE2{flex-grow:3;margin:10px;margin-bottom:20px;min-height:200px;flex-basis:300px;min-width:300px;display:flex;flex-direction:column;}.GOK0K1ECK2{flex-grow:0;flex-shrink:0;box-sizing:border-box;border-radius:2px;border:1px solid #ddd;line-height:1.5;min-height:50px;}.GOK0K1ECK2>div{font-style:italic;}.GOK0K1ECI1{flex-grow:1;flex-shrink:1;box-sizing:border-box;border-radius:2px;border:1px solid #ddd;line-height:1.5;margin-top:20px;}.GOK0K1ECN1{box-sizing:border-box;border-radius:2px;background-color:#fafafa;padding:6px 6px;width:100%;font-weight:bold;min-height:16px;white-space:normal;}.GOK0K1ECN1>*{min-height:16px;display:block;}.GOK0K1ECC2{text-align:center;padding-top:40px;}.GOK0K1ECD2>input+label::after{background:#36c;}.GOK0K1ECL2>input+label::after{background:#109618;}.GOK0K1ECG2>input+label::after{background:#9370db;}.GOK0K1ECL1>input+label::after{background:#808080;}.GOK0K1ECH1>input+label::after{background:#dc3912;}.GOK0K1ECG1{display:flex;flex-flow:row nowrap;align-items:center;justify-content:center;-webkit-justify-content:center;}.GOK0K1ECM1,.GOK0K1ECF2{height:32px;flex-basis:70px;border-radius:3px;font-size:11px;font-weight:600;white-space:nowrap;margin:3px;border:none;padding:0;}.GOK0K1ECJ2{position:fixed;width:0;height:0;z-index:2000000000;top:50%;left:50%;}.GOK0K1ECF1,.GOK0K1ECO1{position:relative;}.GOK0K1ECA2{padding:6px;border:none;background:none;min-width:30px;color:#727173;}.GOK0K1ECA2:HOVER{background-color:#f7f9fa;}.GOK0K1ECK1{color:#ed5564;}.GOK0K1ECH2{display:flex;flex-flow:row nowrap;align-items:center;justify-content:space-between;}.GOK0K1ECD1{padding:2px;}.GOK0K1ECJ1{padding-top:5px;}.GOK0K1ECB2{height:26px;font-size:10px;}"}
  </style>
  <style>
    {".GOK0K1ECJJB{display:flex;flex-flow:row nowrap;align-items:flex-start;}.GOK0K1ECJJB:LAST-CHILD{margin-top:10px;}.GOK0K1ECLJB{box-sizing:border-box;height:36px;border:none;border-bottom:1px solid #e4e5e7;border-radius:4px;background-color:#fff;font-size:12px !important;display:block;padding:4px 4px;}.GOK0K1ECLJB option{font-weight:300;}.GOK0K1ECLJB:HOVER{background-color:#e9f1ff;}.GOK0K1ECCJB{min-width:75px;width:75px;margin-right:5px;}.GOK0K1ECDJB,.GOK0K1ECHJB{min-width:40px;width:40px;}.GOK0K1ECFJB{border-top-right-radius:0 !important;border-bottom-right-radius:0 !important;padding-left:4px !important;padding-right:20px !important;}.GOK0K1ECGJB{border-top-left-radius:0 !important;border-bottom-left-radius:0 !important;padding-left:4px !important;padding-right:20px !important;}.GOK0K1ECKJB{width:130px;min-width:130px;flex-basis:130px;margin-left:5px;flex-grow:1;}.GOK0K1ECKJB select{text-transform:capitalize;}.GOK0K1ECIJB{font-style:italic !important;flex-grow:2;width:150px;min-width:150px;flex-basis:150px;margin-left:5px;line-height:1.5;min-height:36px;}.GOK0K1ECIJB textarea{font-style:italic !important;line-height:1.5 !important;font-size:12px !important;}.GOK0K1ECBJB{min-width:62px;width:62px;margin-left:5px;display:flex;flex-flow:row nowrap;}.GOK0K1ECEJB{padding:4px;width:30px;height:30px;font-size:13px;box-sizing:border-box;}.GOK0K1ECEJB:FIRST-CHILD{margin-right:2px;}.GOK0K1ECPIC{position:relative;overflow:hidden;padding:0 !important;height:auto !important;}.GOK0K1ECOIC{color:transparent !important;padding:8px 4px;}.GOK0K1ECAJC{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;box-sizing:border-box;border:none;background-color:transparent;resize:none;overflow:hidden;line-height:1.5;padding:8px 4px;}"}
  </style>
  <style>
    {".GOK0K1ECAIB{z-index:2;width:100%;right:0;background-color:white;min-height:100%;}.GOK0K1ECAIB>div>table{margin-left:auto;margin-right:auto;width:100%;max-width:185mm;}.GOK0K1ECBIB{max-width:185mm;font-size:14px;color:black;margin:auto}.GOK0K1ECOHB{max-width:128px;max-height:77px;box-sizing:border-box;margin-left:5px;margin-top:0;margin-bottom:0;align-self:center;}.GOK0K1ECMHB{font-size:1.11em;font-weight:bold;margin-bottom:3px;}.GOK0K1ECLHB{font-size:0.78em;margin:3px 0;}.GOK0K1ECNHB{margin:3px 0;display:flex;flex-flow:row wrap;justify-content:flex-end;align-items:center;font-size:0.78em;}.GOK0K1ECFIB{display:flex;flex-flow:row nowrap;align-items:center;position:fixed;top:5px;font-size:12px;right:61px;}.GOK0K1ECPHB{width:40px;height:40px;border:none;background:none;padding:0;border-radius:2px;position:fixed;top:0;right:17px;}.GOK0K1ECPHB:HOVER{background-color:#f7f9fa;}.GOK0K1ECKHB{text-transform:capitalize;}.GOK0K1ECGIB{display:flex;flex-flow:row wrap;margin-left:-10px;margin-right:-10px;align-items:center;min-height:24px;margin-top:10px;}.GOK0K1ECGIB>*{box-sizing:border-box;margin:3px 10px;min-width:150px;flex-basis:150px;flex-grow:1;}.GOK0K1ECDIB{width:90px;font-weight:600;margin-top:5px;}.GOK0K1ECHIB{min-height:26.8px;background-color:rgb(221, 221, 221);padding:5px 0;border-radius:2px;box-sizing:border-box; -webkit-print-color-adjust: exact !important; padding-left:10px !important; border:2px solid #000000}.GOK0K1ECEIB{font-style:italic;line-height:1.5;font-weight:300;}.GOK0K1ECCIB{border-spacing:7px;font-style:italic;flex-grow:1;}"}
  </style>
  <style>
    {".thongtinkhin{margin:auto; width: 95%;} .thongtinkhin td,.thongtinkhin th{color:#000;font-weight:500;border:0;text-align:left;padding:0} .printFooter{font-size:7px;color:#999;border-bottom:1px solid #999;width:100%;max-width:185mm;padding-top:5px;display:flex;align-items:center;justify-content:space-between}"}
  </style>
  <table cellSpacing={0} cellPadding={0} className="thongtinkhin">

<tbody>
  <tr className="dialogTop">
    <td className="dialogTopLeft">
      <div className="dialogTopLeftInner" />
    </td>
    <td className="dialogTopCenter">
      <div className="dialogTopCenterInner">
        <div className="Caption" />
      </div>
    </td>
    <td className="dialogTopRight">
      <div className="dialogTopRightInner" />
    </td>
  </tr>
  <tr className="dialogMiddle">
    <td className="dialogMiddleLeft">
      <div className="dialogMiddleLeftInner" />
    </td>
    <td className="dialogMiddleCenter">
      <div className="dialogMiddleCenterInner dialogContent">
        <div className="GOK0K1ECBIB">
        <div className="printFooter" style={{width: '200px', marginBottom: '5px'}}> <div>QUẢN LÝ PHÒNG NHA</div> <div className="gwt-Label">In lúc {moment(dateTime).format("DD-MM-YYYY HH:mm:ss")}</div> </div>
          <div style={{display: 'flex', flexFlow: 'row nowrap', borderBottom: '4px solid #ddd'}}>
            <div style={{marginRight: '10px', alignSelf: 'flex-end', whiteSpace: 'nowrap'}}>
              <div style={{fontSize: '1.55em', fontWeight: 600, textTransform: 'uppercase', display: 'flex', alignItems: 'center'}}>Thông tin khách hàng</div>
              <div style={{fontStyle: 'italic', margin: '3px 0'}}> <span style={{fontWeight: 600}}>Ngày tạo: {moment(thongtinkhachhang.created_at).format("DD-MM-YYYY HH:mm:ss")}</span> <span /> </div>
            </div>
            <div style={{textAlign: 'right', alignSelf: 'flex-end', flexGrow: 1, textTransform: 'capitalize', fontWeight: 300}}>
              <div className="GOK0K1ECMHB GOK0K1ECKHB">NHA KHOA WESTWAY</div>
              <div className="GOK0K1ECLHB" aria-hidden="true" style={{display: 'none'}}><i aria-hidden="true" className="fa fa-home" style={{marginRight: '3px', color: '#999'}} /> <span className="gwt-InlineLabel" /></div>
              <div className="GOK0K1ECNHB" style={{}}>
                <div className="gwt-HTML"><i className="fa fa-phone" style={{marginLeft: '10px', marginRight: '3px', color: '#999'}} />0793 999 996</div>
                <div style={{textTransform: 'uppercase'}}><i className="fa fa-envelope" style={{marginLeft: '10px', marginRight: '3px', color: '#999'}} />{chinhanh}</div>
              </div>
              <div className="GOK0K1ECNHB" aria-hidden="true" style={{display: 'none'}}>
                <div style={{textTransform: 'lowercase'}} />
                <div style={{textTransform: 'lowercase'}} />
              </div>
            </div>  </div>
          <div className="GOK0K1ECGIB" style={{marginTop: '30px'}}>
            <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'flex-start'}}>
              <div className="GOK0K1ECDIB" style={{marginRight: '10px'}}>Họ và tên</div>
              <div className="GOK0K1ECKHB GOK0K1ECHIB" style={{flexGrow: 1,minHeight:'26.8px',backgroundColor:'rgb(221, 221, 221)',padding:'5px 0',borderRadius:'2px'}}>{thongtinkhachhang.hoten}</div>
            </div>
            <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'flex-start'}}>
              <div className="GOK0K1ECDIB" style={{marginRight: '10px'}}>MSKH</div>
              <div className="GOK0K1ECHIB" style={{flexGrow: 1}}>{thongtinkhachhang.mahoso}</div>
            </div>
          </div>
          <div className="GOK0K1ECGIB">
            <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'flex-start'}}>
              <div className="GOK0K1ECDIB" style={{marginRight: '10px'}}>Giới tính</div>
           
              {(() => {
        if (thongtinkhachhang.gioitinh==="1") {
          return (
            <div className="GOK0K1ECHIB" style={{flexGrow: 1}}>Nam</div>
          )
        } else {
          return (
            <div className="GOK0K1ECHIB" style={{flexGrow: 1}}>Nữ</div>
          )
        }
      })()}
              
            </div>
            <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'flex-start'}}>
              <div className="GOK0K1ECDIB" style={{marginRight: '10px'}}>Ngày sinh</div>
              <div className="GOK0K1ECHIB" style={{flexGrow: 1}}>{thongtinkhachhang.ngaysinh}</div>
            </div>
          </div>
          <div className="GOK0K1ECGIB">
            <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'flex-start'}}>
              <div className="GOK0K1ECDIB" style={{marginRight: '10px'}}>Địa chỉ</div>
              <div className="GOK0K1ECHIB" style={{flexGrow: 1}}>{thongtinkhachhang.diachi}</div>
            </div>
          </div>
          
  
        
      
          <div className="GOK0K1ECGIB" style={{alignItems: 'stretch'}}>
            <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'flex-start'}}>
              <div className="GOK0K1ECDIB" style={{alignSelf: 'flex-start', marginTop: '5px', marginRight: '10px'}}>Bệnh lý</div>
              <div className="GOK0K1ECEIB GOK0K1ECHIB" style={{height: '100%', flexGrow: 1}}>
              {benhlyds.map(dv => (
                
        JSON.parse(dv.benhly).map(cd =>(
<div style={{fontWeight: 'bold'}}><i className="fa fa-check-square-o" /> <span className="gwt-InlineLabel">{cd.label}</span></div>
        ))
        
     
    ))}
           
              </div>
                  
                 
            </div>
          
          </div>
          <div className="GOK0K1ECGIB" style={{alignItems: 'stretch'}}>
           
            <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'stretch'}}>
              <div className="GOK0K1ECDIB" style={{alignSelf: 'flex-start', marginTop: '5px', marginRight: '10px'}}> Tiểu sử bệnh </div>
              <div className="GOK0K1ECEIB GOK0K1ECHIB" style={{height: '100%', flexGrow: 1}}>{tiensu.map(dv => (
                <p key={dv.id}>{dv.ten}</p>
              ))}</div>
            </div>
          </div>
          <div className="">
             <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'flex-start', marginTop: '15px'}}>
             <div className="GOK0K1ECDIB" style={{alignSelf: 'flex-start', marginTop: '5px', marginRight: '10px'}}> Ghi chú </div>
                 <div className="GOK0K1ECEIB GOK0K1ECHIB" style={{flexGrow: 1, minHeight: '50px'}}>{ghichutext.map(paragraph =>
            <p>
                {paragraph}
            </p>
        )}</div>
            </div>
      </div>
          <div className="GOK0K1ECECC" style={{marginTop: '100px'}}>
          <div style={{flexBasis: '300px'}}>
            <div style={{fontWeight: 600, marginRight: '5px'}}>Phòng khám ký tên</div>
            <div className="GOK0K1ECHCC GOK0K1ECIBC"></div>
          </div>
          <div style={{whiteSpace: 'nowrap'}}>
            <div style={{fontWeight: 600, marginRight: '5px'}}>Bệnh nhân ký tên</div>
            <div className="GOK0K1ECHCC"></div>
          </div>
        </div>
         
        
          </div>
      </div>
    </td>
    <td className="dialogMiddleRight">
      <div className="dialogMiddleRightInner" />
    </td>
  </tr>
  <tr className="dialogBottom">
    <td className="dialogBottomLeft">
      <div className="dialogBottomLeftInner" />
    </td>
    <td className="dialogBottomCenter">
      <div className="dialogBottomCenterInner" />
    </td>
    <td className="dialogBottomRight">
      <div className="dialogBottomRightInner" />
    </td>
  </tr>
</tbody>
</table>

</div>
       
   
      );
    }
  }
  class BangInThongTin extends Component {
    constructor (props) {
      super(props)
       
  
      
      this.state = {
       khachhangId:"",
       khachhang:[]
    }
  }
    componentDidMount() {
      
     
      
    }
    render() {
     
  
  const datakhachhang=this.props.datakhachhang
  const dichvudieutri=this.props.dichvudieutri
  const tiensubenh=this.props.tiensubenh
  const nguongioithieu=this.props.nguongioithieu
  const benhly=this.props.benhly
  const benhlyds=this.props.benhlyds
  const chinhanh=this.props.chinhanh
  const ghichutext=this.props.ghichutext
      return (
    
        <div className="col-md-12">
          <ReactToPrint
            trigger={() =>   <button type="button" className="btn btn-light GOK0K1ECFIB hideOnPrint" id="inraclick"><i className="fa fa-print" style={{marginRight: '5px'}} /> In ra</button>}
            content={() => this.componentRef}
          />
          <ComponentToPrint key={datakhachhang.ID} ghichutext={ghichutext} chinhanh={chinhanh} benhlyds={benhlyds} benhly={benhly} datakhachhang={datakhachhang} dichvudieutri={dichvudieutri} tiensubenh={tiensubenh} nguongioithieu={nguongioithieu} ref={el => (this.componentRef = el)} />
        </div>
      )
    }
  }
  export default BangInThongTin