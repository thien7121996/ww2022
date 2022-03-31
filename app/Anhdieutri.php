<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Anhdieutri extends Model
{
    protected $table = 'anhdieutri';
    protected $fillable = ['idkhachhang', 'iddieutri', 'idkhammoi', 'url'];
}
