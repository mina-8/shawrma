<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OurRegionalOffice extends Model
{
    use \Spatie\Translatable\HasTranslations;

    protected $fillable = [
        'state',
        'address',
        'mailbox',
        'phone',
        'email',

    ];
    public $translatable = ['state' , 'address'];

    protected $casts = [
        'state' => 'array',
        'address' => 'array',
    ];

    protected $guarded = ['id'];

}
