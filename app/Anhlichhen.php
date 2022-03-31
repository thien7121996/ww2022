<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Anhlichhen extends Model
{
    protected $table = 'anhlichhen';
    protected $fillable = ['idkhachhang', 'idlich', 'iddieutri', 'idkhammoi', 'url'];
}
