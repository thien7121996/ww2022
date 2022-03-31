<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sanphamdichvu extends Model
{
    protected $table = 'dieutri';
    protected $fillable = ['ten', 'sotien', 'baohanh', 'donvitinh', 'idcha'];
}
