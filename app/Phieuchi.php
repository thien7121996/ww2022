<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Phieuchi extends Model
{
    protected $table = 'chitieuhangngay';
    protected $fillable = ['khoanchi', 'ngaychi', 'sotien'];
   
    
}
