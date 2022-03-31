<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Giaoviec extends Model
{
    protected $table = 'giaoviec';
    protected $fillable = ['nguoigiao',
	'nguoinhan',
	'theodoi',
	'congviec',
	'ghichugiao',
	'thoigiangiao',
	'linkcongviecgiao',
	'thoigianketthuc',
	'trangthaigiao',
	'trangthaihoanthanh',
	'ketqua',
	'linkcongviechoanthanh',
	'ghichuhoanthanh',
	'thoigianhoanthanh'
	];
}
