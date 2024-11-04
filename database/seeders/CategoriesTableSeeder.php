<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesTableSeeder extends Seeder
{
    public function run()
    {
        $categories = [
            [
                'id' => 3,
                'name' => 'Magang',
                'created_at' => '2024-10-10 00:00:00',
                'updated_at' => '2024-10-10 00:00:00',
            ],
            [
                'id' => 4,
                'name' => 'Izin Kegiatan',
                'created_at' => '2024-10-10 00:00:00',
                'updated_at' => '2024-10-10 00:00:00',
            ],
            [
                'id' => 5,
                'name' => 'Pengadaan',
                'created_at' => '2024-10-10 00:00:00',
                'updated_at' => '2024-10-10 00:00:00',
            ],
            [
                'id' => 6,
                'name' => 'Seminar',
                'created_at' => '2024-10-10 00:00:00',
                'updated_at' => '2024-10-10 00:00:00',
            ],
            [
                'id' => 7,
                'name' => 'Proyek',
                'created_at' => '2024-10-10 00:00:00',
                'updated_at' => '2024-10-10 00:00:00',
            ],
            [
                'id' => 8,
                'name' => 'Kerjasama',
                'created_at' => '2024-10-10 00:00:00',
                'updated_at' => '2024-10-10 00:00:00',
            ],
            [
                'id' => 9,
                'name' => 'Keuangan',
                'created_at' => '2024-10-10 00:00:00',
                'updated_at' => '2024-10-10 00:00:00',
            ],
            [
                'id' => 10,
                'name' => 'Laporan',
                'created_at' => '2024-10-10 00:00:00',
                'updated_at' => '2024-10-10 00:00:00',
            ],
            [
                'id' => 11,
                'name' => 'Tugas',
                'created_at' => '2024-10-10 00:00:00',
                'updated_at' => '2024-10-10 00:00:00',
            ],
            [
                'id' => 12,
                'name' => 'Rekomendasi',
                'created_at' => '2024-10-10 00:00:00',
                'updated_at' => '2024-10-10 00:00:00',
            ],
            [
                'id' => 13,
                'name' => 'Internship',
                'created_at' => '2024-10-13 16:04:10',
                'updated_at' => '2024-10-13 16:04:10',
            ],
        ];

        foreach ($categories as $category) {
            DB::table('categories')->updateOrInsert(
                ['id' => $category['id']],
                $category
            );
        }
    }
}
