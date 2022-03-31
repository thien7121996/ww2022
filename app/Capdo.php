<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Capdo extends Model
{
    protected $table = 'capdo';
    protected $fillable = ['tencapdo', 'phantram', 'sotiencapdo'];
}
