<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lichsuchinhsua extends Model
{
    protected $table = 'lichsuchinhsua';
    protected $fillable = ['noidungchinhsua', 'idkhachhang', 'userchinhsua'];
    public function khachhang()
	{
		return $this->belongsTo('App\Khachhang','idkhachhang','ID');
	}
}
