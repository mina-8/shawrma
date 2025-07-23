<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    protected $fillable = [
        'title',
        'image',
        'conttent',
        'price'
    ];
    
    protected $guarded = ['id'];

}
