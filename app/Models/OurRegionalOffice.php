<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OurRegionalOffice extends Model
{
    use \Spatie\Translatable\HasTranslations;

    protected $fillable = [
        'state',
        'address',
        'fax',
        'phone',
        'phone_free',
        'email',

    ];
    public $translatable = ['state' , 'address'];

    protected $casts = [
        'state' => 'array',
        'address' => 'array',
    ];

    protected $guarded = ['id'];

}
