<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chiphi extends Model
{
    protected $table = 'chiphi';
    protected $fillable = ['ngaytao','ten','gia','soluong','thanhtien','giamgia','tientichluydung','saugiam', 'loaigiamgia','idkhachhang','idkhammoi'];
    public function khammoi()
	{
		return $this->belongsTo(Khammoi::class, 'idkhammoi','id');
	}
}
