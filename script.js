// Menunggu seluruh konten HTML dimuat sebelum menjalankan script
document.addEventListener('DOMContentLoaded', () => {

    // --- MOCK DATA (Data Pengganti) ---
    // Di aplikasi nyata, Anda akan mengambil (fetch) data ini dari API/database.
    
    // Data Agregat Kelas (Anonim)
    const classData = [
        { id: 'bab-1', title: 'Bab 1: Aljabar', avgScore: 82, avgTime: 6.5 },
        { id: 'bab-2', title: 'Bab 2: Geometri', avgScore: 68, avgTime: 8.2 },
        { id: 'bab-3', title: 'Bab 3: Trigonometri', avgScore: 91, avgTime: 5.1 },
        { id: 'bab-4', title: 'Bab 4: Statistika', avgScore: 55, avgTime: 7.9 }
    ];

    // Data Siswa yang Sedang Login (Pribadi)
    const userData = {
        'bab-1': 90,
        'bab-2': 72,
        'bab-3': 85,
        'bab-4': 60
    };

    // Batas Skor Kritis
    const CRITICAL_THRESHOLD = 70;

    // --- Referensi Elemen DOM ---
    const chartArea = document.getElementById('chart-area');
    const compareBtn = document.getElementById('compare-btn');
    const filterSelect = document.getElementById('filter-kelas');

    let isComparing = false; // Status untuk tombol "Bandingkan"

    /**
     * Fungsi Utama: Merender (menggambar) grafik batang ke halaman.
     * @param {Array} data - Array data bab yang akan ditampilkan.
     */
    function renderChart(data) {
        // 1. Kosongkan area chart sebelum menggambar yang baru
        chartArea.innerHTML = '';

        // 2. Loop melalui setiap bab di data
        data.forEach(chapter => {
            const avgScore = chapter.avgScore;
            const userScore = userData[chapter.id] || 'N/A';
            const isCritical = avgScore < CRITICAL_THRESHOLD;

            // 3. Buat elemen-elemen HTML untuk setiap batang
            
            // Wrapper luar
            const barWrapper = document.createElement('div');
            barWrapper.className = 'chart-bar-wrapper';

            // Label skor (angka di atas batang)
            const scoreLabel = document.createElement('span');
            scoreLabel.className = 'bar-label-score';
            scoreLabel.textContent = `${avgScore}%`;

            // Wadah batang
            const barContainer = document.createElement('div');
            barContainer.className = 'chart-bar';

            // Isian batang (yang berwarna)
            const barFill = document.createElement('div');
            barFill.className = 'bar-fill';
            barFill.style.height = `${avgScore}%`; // Tinggi batang = persentase skor
            
            if (isCritical) {
                barFill.classList.add('critical'); // Tambah kelas .critical jika skor rendah
            }

            // Detail di bawah batang
            const details = document.createElement('div');
            details.className = 'bar-details';

            const titleEl = document.createElement('span');
            titleEl.className = 'chapter-title';
            titleEl.textContent = chapter.title;

            const timeEl = document.createElement('span');
            timeEl.className = 'avg-time';
            timeEl.textContent = `Avg. ${chapter.avgTime} mnt`;

            details.appendChild(titleEl);
            details.appendChild(timeEl);

            // Tambahkan penanda kritis jika perlu
            if (isCritical) {
                const criticalMarker = document.createElement('span');
                criticalMarker.className = 'critical-marker';
                criticalMarker.textContent = '⚠️ Area Kritis';
                details.appendChild(criticalMarker);
            }

            // Tampilan perbandingan skor pribadi (disembunyikan)
            const compareEl = document.createElement('div');
            compareEl.className = 'user-score-comparison'; // default display: none
            compareEl.textContent = `Skormu: ${userScore}%`;

            // 4. Susun elemen-elemen menjadi satu kesatuan
            barContainer.appendChild(barFill);
            barWrapper.appendChild(scoreLabel);
            barWrapper.appendChild(barContainer);
            barWrapper.appendChild(details);
            barWrapper.appendChild(compareEl);

            // 5. Tambahkan batang yang sudah jadi ke area chart
            chartArea.appendChild(barWrapper);
        });
    }

    /**
     * Fungsi untuk menangani klik tombol "Bandingkan".
     */
    function toggleUserComparison() {
        isComparing = !isComparing; // Balik status (true -> false, false -> true)

        // Ambil SEMUA elemen perbandingan skor
        const allCompareElements = document.querySelectorAll('.user-score-comparison');
        
        allCompareElements.forEach(el => {
            el.classList.toggle('visible', isComparing);
        });

        // Ubah teks tombol
        if (isComparing) {
            compareBtn.textContent = 'Sembunyikan Skorku';
        } else {
            compareBtn.textContent = 'Bandingkan dengan Skorku';
        }
    }

    /**
     * Fungsi untuk menangani perubahan filter kelas.
     */
    function handleFilterChange() {
        const selectedClass = filterSelect.value;
        console.log(`Filter diubah ke: ${selectedClass}`);
        
        // --- LOGIKA APLIKASI NYATA ---
        // Di sini Anda akan:
        // 1. Membuat panggilan API (fetch) ke server.
        // 2. Mengirim `selectedClass` sebagai parameter.
        // 3. Server mengembalikan data JSON baru yang sesuai filter.
        // 4. Panggil `renderChart(dataBaru)` dengan data tersebut.

        // Untuk demo ini, kita gambar ulang dengan data yang sama.
        renderChart(classData);
    }

    // --- Inisialisasi dan Event Listeners ---
    
    // Gambar chart saat halaman pertama kali dimuat
    renderChart(classData);

    // Tambahkan listener ke tombol "Bandingkan"
    compareBtn.addEventListener('click', toggleUserComparison);

    // Tambahkan listener ke filter dropdown
    filterSelect.addEventListener('change', handleFilterChange);

});
