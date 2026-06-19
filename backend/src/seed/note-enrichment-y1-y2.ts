export interface NoteEnrichment {
  extraExplanation: string;
  extraKeyPoints: string[];
  extraVocabulary: { term: string; definition: string }[];
  extraRecap: string;
}

export const ENRICHMENT_Y1_Y2: Record<string, NoteEnrichment> = {
  '1-1': {
    extraExplanation:
      'Cuba aktiviti "detektif sains" di taman sekolah: pilih tiga objek berbeza dan catat ciri yang dilihat, dihidu serta disentuh dalam buku nota. Bandingkan saiz daun dari pokok yang sama pada waktu pagi dan petang — adakah ia berubah? Latihan ini melatih murid merekod bukti sebelum membuat inferens, bukan sekadar meneka.',
    extraKeyPoints: [
      'Gunakan carta pemerhatian dengan lajur "Apa saya lihat?", "Apa saya dengar?" dan "Apa saya rasa?" untuk penyiasatan lebih teratur.',
      'KBAT: Jika ramalan anda salah selepas ujian, ubah inferens — ahli sains yang jujur mengakui bukti baharu.',
      'Ukur panjang anak benih setiap minggu dengan pembaris; corak pertumbuhan membantu meramal saiz minggu depan.',
    ],
    extraVocabulary: [
      { term: 'pemerhatian berulang', definition: 'Memerhati objek yang sama beberapa kali untuk melihat perubahan' },
      { term: 'rekod data', definition: 'Menulis atau melukis maklumat yang dikumpul semasa penyiasatan' },
    ],
    extraRecap:
      'Kemahiran saintifik menjadi lebih kuat apabila murid merekod bukti dengan teliti sebelum membuat kesimpulan.',
  },

  '1-2': {
    extraExplanation:
      'Sebelum masuk makmal, buat senarai semak keselamatan bersama rakan: cermin mata, kasut tertutup, dan tangan bersih. Latih tanggapan tumpahan simulasi — beritahu guru, jangan sentuh tanpa arahan, dan undur ke zon selamat. Amalan ini membina tabiat bertanggungjawab seperti penyelidik sebenar.',
    extraKeyPoints: [
      'Letakkan beg dan buku di rak yang ditetapkan supaya laluan kecemasan kekal lapang.',
      'KBAT: Kenapa peraturan "tidak makan di makmal" wujud? Fikirkan risiko tumpahan bahan ke makanan.',
      'Semak label botol sebelum guna — warna dan simbol amaran memberi petunjuk bahaya.',
    ],
    extraVocabulary: [
      { term: 'zon selamat', definition: 'Kawasan yang ditetapkan untuk berdiri semasa kecemasan di makmal' },
      { term: 'simbol amaran', definition: 'Gambar pada label yang memberitahu bahan berbahaya atau beracun' },
    ],
    extraRecap:
      'Makmal yang selamat bermula dengan persediaan diri dan mematuhi arahan guru tanpa kompromi.',
  },

  '1-3': {
    extraExplanation:
      'Bawa bekas telur kosong ke kelas dan isi dengan objek dari rumah — kertas, batu, mainan dan daun. Murid goncang, perhatikan dan teka: hidup atau bukan hidup? Kemudian buka dan semak. Aktiviti ini mengajar bahawa pemerhatian teliti lebih baik daripada tekaan semata-mata.',
    extraKeyPoints: [
      'Benih kering nampak "tidak hidup" tetapi menjadi hidup bila disiram — ciri kehidupan muncul secara berperingkat.',
      'KBAT: Adakah api hidup? Bandingkan — api bergerak dan membesar tetapi tidak bernafas seperti tumbuhan.',
      'Buat carta Venn: bulatan kiri "Bernafas", kanan "Bergerak", tumpang tindih untuk objek yang kedua-duanya.',
    ],
    extraVocabulary: [
      { term: 'organisma', definition: 'Haiwan atau tumbuhan yang mempunyai ciri-ciri kehidupan' },
      { term: 'ciri kehidupan', definition: 'Ciri seperti bernafas, bergerak, membesar dan membiak yang membezakan benda hidup' },
    ],
    extraRecap:
      'Pengelasan benda hidup dan bukan hidup menjadi tepat apabila murid memerhati banyak ciri, bukan satu sahaja.',
  },

  '1-4': {
    extraExplanation:
      'Lukis poster "Hari Sihatku" dengan gambar sarapan berkhasiat, masa basuh tangan, dan waktu tidur. Label organ luar (kulit melindungi, tulang menyokong) dan terangkan fungsi ringkas. Murid boleh ukur nadi sebelum dan selepas larian di padang untuk merasai jantung bekerja lebih laju.',
    extraKeyPoints: [
      'Gigi perlu dibersihkan dua kali sehari — kuman dari makanan boleh menyebabkan lubang gigi.',
      'KBAT: Mengapa bayi memerlukan tidur lebih lama? Badan sedang membesar dan membaiki tisu.',
      'Minum sekurang-kurangnya 6-8 gelas air sehari, lebih banyak jika beraktiviti atau cuaca panas.',
    ],
    extraVocabulary: [
      { term: 'nadi', definition: 'Denyutan yang dirasakan di pergelangan tangan, menunjukkan jantung sedang memompa darah' },
      { term: 'imuniti', definition: 'Keupayaan badan melawan kuman dan penyakit' },
    ],
    extraRecap:
      'Menjaga badan bermaksud memberi nutrien, rehat, kebersihan dan senaman secara konsisten setiap hari.',
  },

  '1-5': {
    extraExplanation:
      'Sediakan "kad habitat": gambar hutan, laut, padang pasir dan bandar. Murid tempel gambar haiwan pada habitat yang betul dan terangkan satu ciri penyesuaian — misalnya ikan berekor untuk berenang. Lawatan maya atau video haiwan Malaysia memperkaya pemahaman kepelbagaian tempatan.',
    extraKeyPoints: [
      'Katak hidup di darat dan air — perhatikan kulit licin dan kaki berenang sebagai penyesuaian.',
      'KBAT: Jika habitat hutan dibakar, haiwan apa yang paling susah mencari makan? Terangkan sebab.',
      'Jangan ganggu sarang burung atau sesungai; memerhati dari jauh ialah sikap menghormati alam.',
    ],
    extraVocabulary: [
      { term: 'penyesuaian', definition: 'Ciri khas haiwan yang membantunya hidup dalam habitat tertentu' },
      { term: 'pemangsa', definition: 'Haiwan yang memburu dan memakan haiwan lain' },
    ],
    extraRecap:
      'Setiap haiwan mempunyai ciri dan habitat tersendiri; kita perlu menjaga alam supaya mereka terus hidup.',
  },

  '1-6': {
    extraExplanation:
      'Tanam biji kacang dalam pasu transparent supaya murid nampak akar menembusi tanah. Catat perubahan setiap 3 hari dalam jurnal tumbuhan. Bandingkan tumbuhan di cahaya matahari dengan yang ditutup kotak gelap — daun kuning menunjukkan tumbuhan perlukan cahaya untuk sihat.',
    extraKeyPoints: [
      'Serbuk sari pada bunga boleh dipindahkan oleh lebah — tanpa serbuk sari, buah dan biji kurang terbentuk.',
      'KBAT: Mengapa pokok di tengah padang lebih tinggi daripada semak di bawah pokok besar?',
      'Daun layu apabila kekurangan air — siram secukupnya, jangan terlalu banyak supaya akar tidak reput.',
    ],
    extraVocabulary: [
      { term: 'pernafasan tumbuhan', definition: 'Proses tumbuhan mengambil oksigen dan mengeluarkan karbon dioksida, terutama pada waktu malam' },
      { term: 'nutrien', definition: 'Bahan penting dalam tanah yang diserap akar untuk pertumbuhan' },
    ],
    extraRecap:
      'Menjaga tumbuhan dengan air, cahaya dan tanah subur bermakna kita menjaga sumber oksigen dan makanan kita.',
  },

  '1-7': {
    extraExplanation:
      'Main permainan "teka benda dalam beg": murid memegang objek tanpa melihat, hanya dengan sentuhan. Kemudian buka mata dan bandingkan tekaan. Aktiviti ini menunjukkan deria sentuhan dan penglihatan memberi maklumat berbeza — dalam sains, gabungkan semua deria untuk pemerhatian lengkap.',
    extraKeyPoints: [
      'Makanan masin dan masam diuji dengan lidah — bahagian depan lidah lebih sensitif kepada manis.',
      'KBAT: Dalam bilik gelap, deria mana paling membantu berjalan dengan selamat? Terangkan.',
      'Jangan cuba menghidu bahan kimia di makmal; deria bau digunakan pada objek selamat seperti herba dan bunga.',
    ],
    extraVocabulary: [
      { term: 'organ deria', definition: 'Bahagian badan khusus seperti mata dan telinga yang berhubung dengan deria' },
      { term: 'rangsangan', definition: 'Sesuatu yang membuat deria kita bertindak balas, seperti bunyi atau bau' },
    ],
    extraRecap:
      'Lima deria bekerjasama membantu kita memerhati alam; gunakan semuanya dengan berhati-hati dan selamat.',
  },

  '1-8': {
    extraExplanation:
      'Buat "kotak misteri magnet": masukkan pelbagai objek (klip, kertas, syiling, manik plastik). Murid jangka objek mana akan melekat pada magnet luar kotak. Uji kutub dengan dua magnet bertanda N dan S — lukis anak panah tarik dan tolak dalam buku nota.',
    extraKeyPoints: [
      'Magnet lemah masih boleh menarik klip kecil; jarak terlalu jauh menyebabkan tarikan hilang.',
      'KBAT: Bolehkah magnet menarik semua jenis logam? Uji syiling dan bandingkan dengan paku besi.',
      'Letakkan magnet jauh dari kad kredit, jam dan telefon — medan magnet boleh rosakkan data elektronik.',
    ],
    extraVocabulary: [
      { term: 'medan magnet', definition: 'Kawasan sekeliling magnet di mana daya tarikan atau tolakan dapat dirasai' },
      { term: 'bahan bukan magnet', definition: 'Bahan seperti kayu, plastik dan kertas yang tidak ditarik oleh magnet' },
    ],
    extraRecap:
      'Magnet berguna kerana tarikan khasnya pada besi; fahami kutub dan gunakan dengan selamat di rumah dan sekolah.',
  },

  '1-9': {
    extraExplanation:
      'Sediakan tiga kain berbeza (kain batik, plastik, kain lap) dan titiskan air sama banyak pada setiap satu. Mula pemasa dan perhatikan kain mana kering paling cepat. Murid lukis keputusan dan cadangkan kegunaan — baju hujan perlu tidak penyerap, tuala perlu penyerap tinggi.',
    extraKeyPoints: [
      'Kertas penapis digunakan dalam sains untuk asingkan pepejal halus daripada cecair.',
      'KBAT: Mengapa pakaian sukan cepat kering? Fikirkan struktur kain yang memudahkan penyejatan air.',
      'Bahan tidak penyerap seperti plastik sesuai untuk botol air dan beg kedap air.',
    ],
    extraVocabulary: [
      { term: 'penyejatan', definition: 'Proses air berubah menjadi wap dan hilang dari permukaan bahan' },
      { term: 'kedap air', definition: 'Sifat bahan yang tidak membenarkan air menembusi atau diserap' },
    ],
    extraRecap:
      'Memahami penyerapan air membantu kita memilih bahan yang sesuai untuk pakaian, kemasan dan alat dapur.',
  },

  '1-10': {
    extraExplanation:
      'Bina menara dari blok kayu atau kotak kosong: cuba bentuk asas sempit dan asas lebar. Catat ketinggian maksimum sebelum roboh. Kemudian bina jambatan kadbod dengan tiang segi tiga — bentuk segi tiga tidak mudah berubah bentuk, sebab itulah ia kerap digunakan dalam struktur sebenar.',
    extraKeyPoints: [
      'Kon stabil untuk tiang bendera; silinder kuat untuk menahan beban seperti tiang jambatan.',
      'KBAT: Kenapa botol kosong diletakkan secara mendatar lebih stabil daripada tegak?',
      'Piramid Mesir mempunyai tapak luas — beban diagihkan rata ke tanah supaya tidak condong.',
    ],
    extraVocabulary: [
      { term: 'beban', definition: 'Berat atau daya yang dikenakan pada struktur' },
      { term: 'keseimbangan', definition: 'Keadaan objek apabila bahagian kiri dan kanan mempunyai berat yang sama' },
    ],
    extraRecap:
      'Memilih bentuk asas yang betul dan lebar menjadikan binaan lebih stabil dan selamat digunakan.',
  },

  '1-11': {
    extraExplanation:
      'Buat jadual pemerhatian cuaca selama seminggu: catat simbol panas, hujan, mendung dan berangin setiap pagi. Bandingkan suhu pagi dan tengah hari dengan termometer jika ada. Murid boleh lukis pemandangan siang (matahari, awan) dan malam (bulan, bintang) dari tempat yang sama.',
    extraKeyPoints: [
      'Tanah liat menahan air lebih lama, tanah pasir cepat kering — sesuai untuk tanaman berbeza.',
      'KBAT: Mengapa kita pakai baju gelap kurang pada waktu tengah hari? Hubungkan dengan haba matahari.',
      'Jangan membuang sampah ke longkang — ia mengalir ke sungai dan mencemari sumber air Bumi.',
    ],
    extraVocabulary: [
      { term: 'atmosfera', definition: 'Lapisan udara yang mengelilingi Bumi dan mempengaruhi cuaca' },
      { term: 'hakisan', definition: 'Proses air dan angin memecahkan batuan menjadi tanah halus' },
    ],
    extraRecap:
      'Memerhati Bumi dan langit setiap hari membantu murid memahami cuaca dan menjaga alam sekitar.',
  },

  '1-12': {
    extraExplanation:
      'Jalan "lawatan teknologi" di sekolah: kenal pasti projektor, pembesar suara, kipas dan lampu. Murid lengkapkan jadual "Alat | Fungsi | Bantuan kepada manusia". Bincang teknologi lama vs moden — misalnya lampu pelita vs lampu LED — dan bagaimana inovasi menjimatkan tenaga.',
    extraKeyPoints: [
      'Teknologi bantu orang kurang upaya — kerusi roda dan alat bantu pendengaran meningkatkan kualiti hidup.',
      'KBAT: Bagaimana basikal memudahkan perjalanan tanpa enjin? Senaraikan tiga faedah kepada alam.',
      'Had masa skrin dan rehat mata penting walaupun menggunakan teknologi moden.',
    ],
    extraVocabulary: [
      { term: 'automasi', definition: 'Teknologi yang membuat kerja berlaku secara automatik tanpa banyak campur tangan manusia' },
      { term: 'tenaga boleh baharu', definition: 'Sumber tenaga seperti solar yang tidak habis dan kurang mencemari alam' },
    ],
    extraRecap:
      'Teknologi memudahkan hidup apabila digunakan dengan bijak, selamat dan menghormati peraturan.',
  },

  '2-1': {
    extraExplanation:
      'Murid bentuk kumpulan empat dan jalankan penyiasatan "biji mana tumbuh lebih cepat?" — jagung, kacang atau biji sawi. Setiap ahli ada tugas: merekod, menyiram, mengukur dan melaporkan. Hasil dibentang dalam carta bar mudah; ini melatih komunikasi saintifik seperti ahli sains sebenar.',
    extraKeyPoints: [
      'Soalan penyiasatan bermula dengan kata tanya: Apakah? Mengapa? Bagaimana? — contoh: "Bagaimana cahaya mempengaruhi pertumbuhan?"',
      'KBAT: Jika dua ujian menghasilkan data berbeza, ulang ujian dan semak sama ada kaedah diikuti dengan sama.',
      'Sikap berani mencuba bermaksud tidak takut gagal — kesilapan memberi pelajaran untuk ujian seterusnya.',
    ],
    extraVocabulary: [
      { term: 'pembentangan', definition: 'Cara berkongsi hasil penyiasatan secara lisan atau bertulis kepada orang lain' },
      { term: 'analisis', definition: 'Proses memerhatikan data dengan teliti untuk memahami maksudnya' },
    ],
    extraRecap:
      'Penyiasatan saintifik berjaya apabila langkah diikuti tertib, data direkod kemas dan hasil dikongsi dengan jujur.',
  },

  '2-2': {
    extraExplanation:
      'Latih murid membaca skala pada gelas ukur dan termometer dengan betul — mata pada paras cecair, bukan menengadah. Buat poster "3 Langkah Selepas Eksperimen": matikan alat, basuh bekas, kembalikan ke rak. Simulasi kecemasan kecil (tumpahan air) melatih tindak balas tenang dan memaklumkan guru.',
    extraKeyPoints: [
      'Pembaris dan termometer hendaklah dipegang tegak semasa membaca untuk ketepatan.',
      'KBAT: Mengapa sarung tangan diperlukan semasa mengendalikan pewarna makanan dalam ujian, walaupun bukan bahan berbahaya?',
      'Jangan menukar susunan alat di rak makmal — setiap alat ada tempat khas untuk mudah dicari.',
    ],
    extraVocabulary: [
      { term: 'pengawasan', definition: 'Pemerhatian dan bimbingan guru semasa murid menjalankan aktiviti makmal' },
      { term: 'pensterilan', definition: 'Proses membersihkan alat supaya bebas kuman sebelum digunakan' },
    ],
    extraRecap:
      'Mengendalikan alat makmal dengan teknik betul dan disiplin keselamatan menjadikan setiap eksperimen lancar.',
  },

  '2-3': {
    extraExplanation:
      'Murid reka menu seimbang untuk satu hari menggunakan piramid makanan: sarapan (karbohidrat + buah), makan tengahari (nasi, protein, sayur), snek (buah), dan minum air. Buat plak "5 Langkah Kebersihan" di bilik air sekolah. Kira gelas air yang diminum — adakah cukup 6 gelas?',
    extraKeyPoints: [
      'Protein dari telur, ikan dan kekacang membantu membaiki tisu selepas bersenam atau bermain.',
      'KBAT: Jika murid hanya makan gula-gula sepanjang hari, bahagian badan mana yang paling terjejas? Terangkan.',
      'Makan sarapan penting — badan mendapat tenaga untuk belajar dan bermain di sekolah.',
    ],
    extraVocabulary: [
      { term: 'serat', definition: 'Bahan dalam sayur dan buah yang membantu pencernaan dan elak sembelit' },
      { term: 'dehidrasi', definition: 'Keadaan badan kekurangan air yang menyebabkan letih dan sakit kepala' },
    ],
    extraRecap:
      'Pemakanan seimbang, air secukupnya dan kebersihan diri ialah tiga tonggak kesihatan murid Tahun 2.',
  },

  '2-4': {
    extraExplanation:
      'Sediakan gambar haiwan Malaysia: harimau (vertebrata), kupu-kupu (invertebrata), penyu (vertebrata), ketam (invertebrata). Murid asingkan dan jelaskan satu ciri setiap kumpulan. Perhatikan serangga di taman — kira kaki dan bahagian badan; rekod dalam jadual pemerhatian 10 minit.',
    extraKeyPoints: [
      'Ikan paus dan lumba-lumba vertebrata walaupun hidup di laut — mereka mamalia, bukan ikan biasa.',
      'KBAT: Mengapa serangga kecil boleh hidup tanpa tulang belakang? Fikirkan kulit keras luar (eksoskeleton).',
      'Haiwan akuatik bernafas melalui insang; haiwan darat melalui paru-paru atau lubang spirakel pada serangga.',
    ],
    extraVocabulary: [
      { term: 'eksoskeleton', definition: 'Rangka keras di luar badan serangga yang melindungi dan menyokong' },
      { term: 'akuatik', definition: 'Berkaitan dengan habitat air seperti sungai, tasik dan laut' },
    ],
    extraRecap:
      'Mengelaskan haiwan kepada vertebrata dan invertebrata membantu murid memahami kepelbagaian hidupan di Bumi.',
  },

  '2-5': {
    extraExplanation:
      'Tanam biji dalam pasu dan ambil gambar setiap minggu untuk "album kitar hidup". Label peringkat: biji, anak benih, daun mula, tumbuhan matang. Bandingkan pokok berbunga (bunga ros) dengan pakis di taman — adakah bunga? Murid catat perbezaan pembiakan bunga vs spora.',
    extraKeyPoints: [
      'Angin dan serangga membantu bawa serbuk sari — tanpa mereka, banyak tumbuhan berbunga sukar membiak.',
      'KBAT: Mengapa biji perlu jatuh jauh dari pokok induk? Supaya tidak berebut cahaya dan nutrien.',
      'Anak benih perlukan tanah longgar — tanah terlalu padat menyukarkan akar menembusi.',
    ],
    extraVocabulary: [
      { term: 'penyerbukan', definition: 'Proses serbuk sari sampai ke pistil bagi membentuk biji' },
      { term: 'kecambah', definition: 'Anak benih yang baru keluar dari biji dengan akar dan daun mula' },
    ],
    extraRecap:
      'Kitar hidup tumbuhan mengajar bahawa setiap peringkat — dari biji hingga biji baharu — saling berkait.',
  },

  '2-6': {
    extraExplanation:
      'Buat eksperimen bayang-bayang: letakkan mainan di hadapan lampu suluh, gerakkan lampu lebih dekat dan jauh. Perhatikan bayang memendek atau memanjang. Gunakan cermin untuk pantulkan cahaya ke dinding — murid lukis laluan cahaya lurus dengan pensel dan pembaris.',
    extraKeyPoints: [
      'Benda lut sinar (kertas nipis) bercahaya separa; benda legap (kayu) menghasilkan bayang gelap.',
      'KBAT: Mengapa kita perlukan lampu jalan pada waktu malam walaupun ada bulan? Bulan tidak bercahaya sendiri.',
      'Warna gelap menyerap haba lebih — pakaian terang lebih selesa pada hari panas.',
    ],
    extraVocabulary: [
      { term: 'legap', definition: 'Tidak membenarkan cahaya menembusi, contohnya kayu dan logam tebal' },
      { term: 'lut sinar', definition: 'Membenarkan sebahagian cahaya menembusi, seperti kertas atau plastik nipis' },
    ],
    extraRecap:
      'Memahami cahaya, pantulan dan bayang-bayang membantu kita menjaga keselamatan dan keselesaan harian.',
  },

  '2-7': {
    extraExplanation:
      'Bina litar ringkas dengan bateri, wayar dan mentol mini (dibimbing guru). Cuba sambung dengan kayu — mentol tidak menyala. Ganti dengan klip logam — mentol menyala. Murid lukis litar lengkap dan label konduktor (wayar) serta insulator (pembalut plastik). Sentiasa matikan suis sebelum menyambung semula.',
    extraKeyPoints: [
      'Litar bersiri: satu laluan; jika satu mentol rosak, keseluruhan litar boleh terputus.',
      'KBAT: Mengapa wayar elektrik dibalut plastik? Fikirkan keselamatan dan pencegahan sengatan.',
      'Jangan sesekali memasukkan objek logam ke dalam palam elektrik — sangat berbahaya.',
    ],
    extraVocabulary: [
      { term: 'sengatan elektrik', definition: 'Bahaya apabila arus elektrik melalui badan, boleh menyebabkan kecederaan serius' },
      { term: 'palam', definition: 'Soket di dinding yang membekalkan elektrik kepada alat rumah' },
    ],
    extraRecap:
      'Elektrik berguna dalam litar lengkap; kenal pasti konduktor dan insulator, dan sentiasa utamakan keselamatan.',
  },

  '2-8': {
    extraExplanation:
      'Murid sediakan campuran air + serbuk koko (homogen) dan air + serbuk coklat (heterogen sebelum kacau). Uji penapisan air pasir dengan penapis kopi. Lukis corak kromatografi dakwat pada kertas penapis — teteskan air dan perhatikan warna berpisah naik ke atas.',
    extraKeyPoints: [
      'Udara ialah campuran gas — mengandungi nitrogen, oksigen dan gas lain yang tidak kelihatan.',
      'KBAT: Bolehkah campuran homogen dipisahkan? Ya, contohnya penyejatan air garam tinggalkan garam.',
      'Jangan rasa bahan kimia di makmal untuk mengenal pasti — gunakan pemerhatian visual sahaja.',
    ],
    extraVocabulary: [
      { term: 'zarah', definition: 'Bahagian terkecil sesuatu bahan yang masih mengekalkan sifat asalnya' },
      { term: 'penjerapan', definition: 'Proses mendapatkan semula zat pepejal yang terlarut selepas penyejatan' },
    ],
    extraRecap:
      'Membezakan campuran homogen dan heterogen membantu murid memilih kaedah pengepasan yang tepat.',
  },

  '2-9': {
    extraExplanation:
      'Bawa sampel batu, pasir dan tanah dari persekitaran sekolah. Perhatikan tekstur dengan jari — kasar, halus atau berlendir. Bincang kegunaan: tanah humus untuk taman, pasir untuk pembinaan, batu untuk jalan. Murid reka poster "Jangan Bazir Sumber Bumi" dengan tiga amalan baik.',
    extraKeyPoints: [
      'Batu kapur terdapat di gua Malaysia — terbentuk dari sisa organisma laut lama.',
      'KBAT: Mengapa penebangan hutan berlebihan mengurangkan tanah subur? Akar pokok mengikat tanah.',
      'Kitar semula kertas dan plastik mengurangkan sisa dan menjimatkan sumber semula jadi.',
    ],
    extraVocabulary: [
      { term: 'kerak Bumi', definition: 'Lapisan luar keras planet Bumi yang terdiri daripada batuan' },
      { term: 'bahan organik', definition: 'Bahan dari sisa tumbuhan dan haiwan yang membuat tanah lebih subur' },
    ],
    extraRecap:
      'Sumber Bumi terhad; gunakan dengan berhemat dan jaga alam supaya kekal subur untuk generasi akan datang.',
  },

  '2-10': {
    extraExplanation:
      'Murid buat garis masa teknologi: roda → mesin taip → telefon → komputer → telefon pintar. Setiap peringkat, tulis satu masalah yang diselesaikan. Bincang etika: tidak menyalin kerja rakan dalam talian, tidak berkongsi kata laluan, dan had masa permainan. Teknologi alat, bukan pengganti berfikir.',
    extraKeyPoints: [
      'GPS dalam telefon pintar membantu navigasi — gabungan teknologi satelit dan peta digital.',
      'KBAT: Bagaimana teknologi bantu warga emas? Contoh: tongkat elektronik, peringatan ubat.',
      'Penemuan Thomas Edison (lampu) dan Alexander Graham Bell (telefon) mengubah kehidupan moden.',
    ],
    extraVocabulary: [
      { term: 'digital', definition: 'Teknologi yang menggunakan data dalam bentuk nombor dan isyarat komputer' },
      { term: 'beretika', definition: 'Menggunakan teknologi mengikut peraturan, hormat dan tidak menyalahgunakan' },
    ],
    extraRecap:
      'Teknologi memudahkan komunikasi dan kerja; gunakan secara beretika dan terus berfikir kreatif sebagai murid sains.',
  },
};