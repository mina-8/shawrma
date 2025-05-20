<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UsageInstruction extends Model
{

    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'product_id',
        'title',
        'content',

    ];
    public $translatable = ['title', 'content'];

    protected $casts = [
        'title' => 'array',
        'content' => 'array',

    ];

    protected $guarded = ['id'];

    public function products(){
        return $this->belongsTo(Product::class);
    }
}
