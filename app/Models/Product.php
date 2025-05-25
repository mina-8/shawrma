<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = [
        'mainproduct_id',
        'title',
        'description',
        'content',
        'image',
        'pdf',
        'uses',
        'advantages',
        'color',
        'special',
        'slug'
    ];
    public $translatable = ['title','description' ,  'content' , 'uses' , 'advantages', 'slug'];

    protected $casts = [
        'title' => 'array',
        'description' => 'array',
        'content' => 'array',
        'uses' => 'array',
        'advantages' => 'array',
        'special' => 'boolean',
        'slug' => 'array',
    ];

    protected $guarded = ['id'];

    public function mainproduct(){
        return $this->belongsTo(MainProduct::class);
    }

    public function usageproduct(){
        return $this->hasMany(UsageInstruction::class);
    }
}
