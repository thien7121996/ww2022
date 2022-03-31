<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Thuocduocpham extends Model
{
    protected $table = 'thuocduocpham';
    protected $fillable = ['ten', 'lieuluong', 'huongdansudung', 'dongia'];
}
