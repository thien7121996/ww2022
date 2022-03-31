<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Thongkenhap extends Model
{
    protected $table = 'thongkenhap';
    protected $fillable = ['ngay', 'hen', 'giao', 'tendungcu', 'congty', 'sl', 'dongia', 'phikhac', 'ghichuphikhac', 'tongcong', 'datra', 'ghichu'];
}
