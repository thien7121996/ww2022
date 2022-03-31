<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Nguongioithieu extends Model
{
    protected $table = 'nguongioithieu';
    protected $fillable = ['nguon','phantram'];
    public function customers()
    {
      return $this->belongstoMany(Customer::class);
    }
    
}
