<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lichsutichluy extends Model
{
    protected $table = 'lichsutichluy';
    protected $fillable = ['khachhangdichvu', 'chitiettichdiem', 'tienthanhtoan', 'khachhanggioithieu', 'idthanhtoan'];
    public function khachhangs()
	{
		return $this->belongsTo(Khachhang::class,'khachhangdichvu','ID');
	}
}
