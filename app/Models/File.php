<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'reference_number',
        'sender',
        'recipient',
        'category_id',
        'file_url',
        'upload_date',
        'mailType',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
