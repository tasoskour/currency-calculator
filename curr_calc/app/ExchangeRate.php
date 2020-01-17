<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExchangeRate extends Model
{
    //
    protected $table = 'rates';
    protected $fillable = ['baseCur', 'targetCur', 'rate'];
}
