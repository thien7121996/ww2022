<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Quangcao extends Model
{
    protected $table = 'quangcao';
    protected $fillable = ['ngaychay', 'sotienchay', 'click', 'hienthi', 'sochuyendoi', 'ctr', 'comment', 'tinnhan', 'chat', 'tuongtac', 'sodienthoai', 'khachdatlich', 'khachden', 'khachlam', 'loaiquangcao', 'sanphamquangcao', 'trangthai'];
}
