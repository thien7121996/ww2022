import React, { Component } from 'react'


class TimetableDoctor extends Component {
  componentDidMount() {
    const scripts = [
      '../public/app_assets/plugins/bower_components/calendar/jquery-ui.min.js',
      '../public/app_assets/plugins/bower_components/moment/moment.js',
      '../public/app_assets/plugins/bower_components/calendar/dist/fullcalendar.min.js',
      '../public/app_assets/plugins/bower_components/calendar/dist/jquery.fullcalendar.js',
      '../public/app_assets/plugins/bower_components/calendar/dist/cal-init.js',
      '../public/app_assets/js/datatable/custom.js',
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
  componentWillMount() {
    const scripts = [
      '../public/app_assets/plugins/bower_components/calendar/jquery-ui.min.js',
      '../public/app_assets/plugins/bower_components/moment/moment.js',
      '../public/app_assets/plugins/bower_components/calendar/dist/fullcalendar.min.js',
      '../public/app_assets/plugins/bower_components/calendar/dist/jquery.fullcalendar.js',
      '../public/app_assets/plugins/bower_components/calendar/dist/cal-init.js',
      '../public/app_assets/js/datatable/custom.js',
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
  render () {
    
    
    return (
        <div>
        <div className="row">
          <div className="col-md-3">
            <div className="white-box">
              <h3 className="box-title">Kéo và thả thời gian biểu của bạn vào lịch</h3>
              <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12">
                  <div id="calendar-events" className="m-t-20">
                    <div className="calendar-events" data-class="bg-info"><i className="fa fa-circle text-info" /> 10 AM</div>
                    <div className="calendar-events" data-class="bg-success"><i className="fa fa-circle text-success" /> 11 AM</div>
                    <div className="calendar-events" data-class="bg-danger"><i className="fa fa-circle text-danger" /> 12 PM</div>
                    <div className="calendar-events" data-class="bg-warning"><i className="fa fa-circle text-warning" /> 1PM</div> 
                  </div>
                  {/* checkbox */}
                  <div className="checkbox">
                    <input id="drop-remove" type="checkbox" />
                    <label htmlFor="drop-remove">
                    Loại bỏ sau khi thả
                    </label>
                  </div>
                  <a href="#" data-toggle="modal" data-target="#add-new-event" className="btn btn-lg m-t-40 btn-danger btn-block waves-effect waves-light">
                    <i className="ti-plus" /> Sửa cuộc hẹn
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="white-box">
              <div id="calendar" />
            </div>
          </div>
        </div>
        {/* /.row */}
        {/* BEGIN MODAL */}
        <div className="modal fade none-border" id="my-event">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 className="modal-title"><strong>Sửa cuộc hẹn</strong></h4>
              </div>
              <div className="modal-body" />
              <div className="modal-footer">
                <button type="button" className="btn btn-white waves-effect" data-dismiss="modal">Đóng</button>
                <button type="button" className="btn btn-success save-event waves-effect waves-light">Tạo sự kiện</button>
                <button type="button" className="btn btn-danger delete-event waves-effect waves-light" data-dismiss="modal">Xóa</button>
              </div>
            </div>
          </div>
        </div>
        {/* Modal Add Category */}
        <div className="modal fade none-border" id="add-new-event">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 className="modal-title"><strong>Sửa</strong> Ngày</h4>
              </div>
              <div className="modal-body">
                <form role="form">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="control-label">Tên khách hàng</label>
                      <input className="form-control form-white" placeholder="Enter name" type="text" name="category-name" />
                    </div>
                    <div className="col-md-6">
                      <label className="control-label">Chọn màu danh mục</label>
                      <select className="form-control form-white" data-placeholder="Choose a color..." name="category-color">
                        <option value="success">Success</option>
                        <option value="danger">Danger</option>
                        <option value="info">Info</option>
                        <option value="primary">Primary</option>
                        <option value="warning">Warning</option>
                        <option value="inverse">Inverse</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger waves-effect waves-light save-category" data-dismiss="modal">Lưu</button>
                <button type="button" className="btn btn-white waves-effect" data-dismiss="modal">Đóng</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TimetableDoctor