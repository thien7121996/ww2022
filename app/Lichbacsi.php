<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lichbacsi extends Model
{
    protected $table = 'lichbacsi';
    protected $fillable = ['idbacsi','ngayoff','ghichu'];
}
