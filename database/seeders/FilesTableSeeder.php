<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FilesTableSeeder extends Seeder
{
    public function run()
    {
        $files = [
            [
                'id' => 9,
                'name' => 'Surat Magang Anak UB',
                'reference_number' => 'GA/976AGH1',
                'sender' => 'Universitas Brawijaya',
                'recipient' => 'CV Tunas Abadi',
                'category_id' => 3,
                'file_url' => 'https://res.cloudinary.com/dzvzxvotk/image/upload/v1730635587/kxv0jrv4o8ycwmfbyade.pdf',
                'upload_date' => '2024-10-09',
                'mailType' => 'outgoing',
                'created_at' => '2024-10-10 00:00:00',
                'updated_at' => '2024-11-03 15:36:39',
            ],
            [
                'id' => 10,
                'name' => 'Permohonan Izin Kegiatan jhqwbwd kjqwd',
                'reference_number' => 'GA/123FDF2',
                'sender' => 'PT Jaya Makmur',
                'recipient' => 'Universitas Brawijaya',
                'category_id' => 4,
                'file_url' => 'https://res.cloudinary.com/dzvzxvotk/image/upload/v1730635587/kxv0jrv4o8ycwmfbyade.pdf',
                'upload_date' => '2024-10-08',
                'mailType' => 'incoming',
                'created_at' => '2024-10-10 00:00:00',
                'updated_at' => '2024-10-11 00:00:00',
            ],
            [
                'id' => 11,
                'name' => 'Surat Pengadaan Barang',
                'reference_number' => 'GA/332LKJ3',
                'sender' => 'PT Sukses Mandiri',
                'recipient' => 'PT Jaya Makmur',
                'category_id' => 5,
                'file_url' => 'https://res.cloudinary.com/dzvzxvotk/image/upload/v1730635587/kxv0jrv4o8ycwmfbyade.pdf',
                'upload_date' => '2024-10-07',
                'mailType' => 'incoming',
                'created_at' => '2024-10-08 00:00:00',
                'updated_at' => '2024-10-09 00:00:00',
            ],
            [
                'id' => 12,
                'name' => 'Permintaan Data Laporan',
                'reference_number' => 'GA/334CVB8',
                'sender' => 'PT Sukses Mandiri',
                'recipient' => 'PT Jaya Abadi',
                'category_id' => 10,
                'file_url' => 'https://res.cloudinary.com/dzvzxvotk/image/upload/v1730635587/kxv0jrv4o8ycwmfbyade.pdf',
                'upload_date' => '2024-10-02',
                'mailType' => 'outgoing',
                'created_at' => '2024-10-05 15:23:02',
                'updated_at' => '2024-11-03 00:00:00',
            ],
            [
                'id' => 13,
                'name' => 'Penawaran Proyek',
                'reference_number' => 'GA/567QWE5',
                'sender' => 'PT Maju Sejahtera',
                'recipient' => 'CV Tunas Abadi',
                'category_id' => 7,
                'file_url' => 'https://res.cloudinary.com/dzvzxvotk/image/upload/v1730635587/kxv0jrv4o8ycwmfbyade.pdf',
                'upload_date' => '2024-10-05',
                'mailType' => 'incoming',
                'created_at' => '2024-10-06 00:00:00',
                'updated_at' => '2024-10-07 00:00:00',
            ],
            [
                'id' => 14,
                'name' => 'Permintaan Data Laporan',
                'reference_number' => 'GA/334CVB8',
                'sender' => 'PT Sukses Mandiri',
                'recipient' => 'PT Jaya Abadi',
                'category_id' => 10,
                'file_url' => 'https://res.cloudinary.com/dzvzxvotk/image/upload/v1730635587/kxv0jrv4o8ycwmfbyade.pdf',
                'upload_date' => '2024-10-02',
                'mailType' => 'outgoing',
                'created_at' => '2024-10-05 00:00:00',
                'updated_at' => '2024-11-03 00:00:00',
            ],
            [
                'id' => 15,
                'name' => 'Laporan Keuangan Bulanan',
                'reference_number' => 'GA/112JUI7',
                'sender' => 'PT Jaya Abadi',
                'recipient' => 'Universitas Brawijaya',
                'category_id' => 9,
                'file_url' => 'https://res.cloudinary.com/dzvzxvotk/image/upload/v1730635587/kxv0jrv4o8ycwmfbyade.pdf',
                'upload_date' => '2024-10-03',
                'mailType' => 'incoming',
                'created_at' => '2024-10-04 00:00:00',
                'updated_at' => '2024-11-03 15:42:29',
            ],
            [
                'id' => 16,
                'name' => 'Permintaan Data Laporan',
                'reference_number' => 'GA/334CVB8',
                'sender' => 'PT Tunas Jaya',
                'recipient' => 'PT Sukses Mandiri',
                'category_id' => 11,
                'file_url' => 'https://res.cloudinary.com/dzvzxvotk/image/upload/v1730635587/kxv0jrv4o8ycwmfbyade.pdf',
                'upload_date' => '2024-10-02',
                'mailType' => 'outgoing',
                'created_at' => '2024-10-10 15:22:51',
                'updated_at' => '2024-11-03 00:00:00',
            ],
            [
                'id' => 17,
                'name' => 'Surat Tugas Karyawan',
                'reference_number' => 'GA/221QWE9',
                'sender' => 'PT Tunas Jaya',
                'recipient' => 'PT Sukses Mandiri',
                'category_id' => 11,
                'file_url' => 'https://res.cloudinary.com/dzvzxvotk/image/upload/v1730635587/kxv0jrv4o8ycwmfbyade.pdf',
                'upload_date' => '2024-10-02',
                'mailType' => 'incoming',
                'created_at' => '2024-10-04 00:00:00',
                'updated_at' => '2024-10-04 00:00:00',
            ],
            [
                'id' => 18,
                'name' => 'Surat Rekomendasi',
                'reference_number' => 'GA/998CVX0',
                'sender' => 'Universitas Brawijaya',
                'recipient' => 'PT Jaya Makmur',
                'category_id' => 12,
                'file_url' => 'https://res.cloudinary.com/dzvzxvotk/image/upload/v1730635587/kxv0jrv4o8ycwmfbyade.pdf',
                'upload_date' => '2024-09-30',
                'mailType' => 'incoming',
                'created_at' => '2024-10-01 00:00:00',
                'updated_at' => '2024-10-02 00:00:00',
            ],
        ];
        foreach ($files as $file) {
            DB::table('files')->updateOrInsert(
                ['id' => $file['id']],
                $file
            );
        }
    }
}
