export interface NoteEnrichment {
  extraExplanation: string;
  extraKeyPoints: string[];
  extraVocabulary: { term: string; definition: string }[];
  extraRecap: string;
}

export const ENRICHMENT_Y4: Record<string, NoteEnrichment> = {
  '4-1': {
    extraExplanation:
      'Penyiasatan saintifik Tahun 4 membina kemahiran berfikir seperti seorang ahli sains sebenar. Murid mesti memahami bahawa sains bukan sekadar menjalankan eksperimen, tetapi melibatkan proses sistematik bermula daripada soalan, hipotesis, perancangan, pengumpulan data, analisis, dan kesimpulan. Hipotesis ditulis dalam bentuk pernyataan yang boleh diuji, contohnya "Semakin banyak cahaya, semakin cepat tumbuhan membesar." Pembolehubah dimanipulasi ialah faktor yang sengaja diubah oleh penyiasat, manakala pembolehubah dimalarkan diukur untuk melihat kesan perubahan tersebut. Pembolehubah kawalan mesti dikekalkan sama supaya hasil eksperimen adil dan boleh dipercayai. Contohnya, dalam kajian pertumbuhan tumbuhan, jumlah air, jenis tanah, dan suhu perlu sama untuk semua pasu; hanya jumlah cahaya yang diubah. Data perlu direkod dalam jadual dengan unit yang betul, kemudian dianalisis menggunakan graf bar atau garis untuk melihat corak. Kesimpulan mesti menyatakan sama ada hipotesis diterima atau ditolak berdasarkan bukti, bukan berdasarkan tekaan. Kemahiran KBAT (Kemahiran Berfikir Aras Tinggi) seperti menilai, menganalisis, dan menyelesaikan masalah membantu murid memahami fenomena saintifik dalam kehidupan harian.',
    extraKeyPoints: [
      'Langkah penyiasatan: soalan → hipotesis → eksperimen → data → analisis → kesimpulan.',
      'Hipotesis mesti boleh diuji dan ditulis sebelum eksperimen dijalankan.',
      'Hanya satu pembolehubah dimanipulasi pada satu masa untuk keputusan yang tepat.',
      'Jadual dan graf membantu melihat corak data dengan lebih jelas.',
      'Kesimpulan berdasarkan bukti; jika data tidak menyokong, hipotesis ditolak.',
      'Eksperimen yang baik boleh diulang dan menghasilkan keputusan yang serupa.',
      'KBAT membantu murid menyelesaikan masalah saintifik dalam kehidupan sebenar.',
    ],
    extraVocabulary: [
      { term: 'penyiasatan saintifik', definition: 'Kajian sistematik menggunakan kaedah saintifik untuk mencari jawapan' },
      { term: 'pembolehubah dimanipulasi', definition: 'Faktor yang sengaja diubah dalam eksperimen' },
      { term: 'pembolehubah dimalarkan', definition: 'Faktor yang diukur untuk melihat kesan perubahan' },
      { term: 'pembolehubah kawalan', definition: 'Faktor yang dikekalkan sama sepanjang eksperimen' },
      { term: 'graf', definition: 'Gambar rajah yang menunjukkan data dalam bentuk visual' },
      { term: 'kesimpulan', definition: 'Jawapan akhir berdasarkan analisis data eksperimen' },
      { term: 'kebolehulangan', definition: 'Keupayaan eksperimen dijalankan semula dengan hasil serupa' },
    ],
    extraRecap:
      'Sains bermula dengan soalan dan hipotesis, diikuti eksperimen terkawal. Ubah satu pembolehubah sahaja, rekod data, analisis dengan graf, dan buat kesimpulan berasaskan bukti.',
  },

  '4-2': {
    extraExplanation:
      'Sistem pernafasan manusia bekerjasama dengan sistem peredaran darah untuk membekalkan oksigen ke seluruh badan. Udara masuk melalui hidung atau mulut, kemudian melalui tekak, trakea (tiub angin), bronkus, dan bronkiol sebelum sampai ke paru-paru. Di dalam paru-paru terdapat berjuta-juta alveolus — saku udara kecil berdinding nipis yang dikelilingi kapilari darah. Di sinilah pertukaran gas berlaku: oksigen dari udara masuk ke dalam darah, manakala karbon dioksida dari darah dikeluarkan ke udara untuk dibuang semasa mengehel nafas. Hidung berfungsi menapis habuk dan kuman, memanaskan udara, serta memlembapkan udara sebelum masuk ke paru-paru. Dinding hidung yang dilapisi rambut halus dan lendir menangkap zarah kotor. Paru-paru sihat sangat penting kerana merokok, pencemaran udara, dan kurang bersenam boleh merosakkannya. Asma dan bronkitis ialah penyakit pernafasan yang menyebabkan kesukaran bernafas. Amalan sihat termasuk tidak merokok, elakkan asap, bersenam secara kerap, dan bernafas melalui hidung terutamanya di tempat berdebu.',
    extraKeyPoints: [
      'Laluan udara: hidung → tekak → trakea → bronkus → bronkiol → paru-paru.',
      'Alveolus ialah tempat utama pertukaran oksigen dan karbon dioksida.',
      'Dinding alveolus nipis dan luas untuk pertukaran gas yang cekap.',
      'Hidung menapis, memanaskan, dan melembapkan udara masuk.',
      'Merokok merosakkan alveolus dan meningkatkan risiko kanser paru-paru.',
      'Senaman meningkatkan kapasiti paru-paru dan kecekapan pernafasan.',
      'Bernafas melalui hidung lebih baik kerana udara ditapis sebelum masuk paru-paru.',
    ],
    extraVocabulary: [
      { term: 'trakea', definition: 'Tiub berserat yang menghantar udara dari tekak ke paru-paru' },
      { term: 'bronkus', definition: 'Salur udara yang membahagi ke kiri dan kanan paru-paru' },
      { term: 'alveolus', definition: 'Saku kecil di paru-paru tempat pertukaran gas berlaku' },
      { term: 'kapilari', definition: 'Salur darah halus yang mengelilingi alveolus' },
      { term: 'oksigen', definition: 'Gas diperlukan sel badan untuk melepaskan tenaga' },
      { term: 'karbon dioksida', definition: 'Gas sisa hasil respirasi sel yang dikeluarkan semasa mengehel nafas' },
      { term: 'asma', definition: 'Penyakit pernafasan yang menyebabkan saluran udara menyempit' },
    ],
    extraRecap:
      'Udara masuk melalui hidung ke paru-paru; oksigen diserap di alveolus dan karbon dioksida dikeluarkan. Jaga paru-paru dengan tidak merokok, bersenam, dan elakkan pencemaran udara.',
  },

  '4-3': {
    extraExplanation:
      'Haiwan hidup dalam pelbagai habitat seperti hutan, padang pasir, laut, dan air tawar. Setiap haiwan mempunyai adaptasi — ciri khas yang membantu mereka bertahan dan membiak. Adaptasi struktur merujuk kepada ciri fizikal badan, seperti sisik ikan yang licin untuk berenang, kaki berwebit itik untuk berenang, dan bulu tebal musang untuk bertahan sejuk. Adaptasi tingkah laku pula merujuk kepada tindakan haiwan, seperti berhijrah burung ke kawasan hangat pada musim sejuk, hibernasi beruang pada musim sejuk, dan berkumpul dalam kawanan untuk melindungi diri. Kamuflaj ialah penyesuaian warna atau corak badan supaya haiwan sukar dilihat, seperti cecak pada pokok dan harimau kumbang di hutan. Di Malaysia, spesies terancam seperti harimau Malaya, gajah Asia, dan badak Sumatera perlu dilindungi kerana ancaman penebangan hutan dan pemburuan haram. Taman negara, rizab hidupan liar, dan undang-undang perlindungan membantu memelihara biodiversiti. Setiap spesies mempunyai peranan dalam ekosistem; kehilangan satu spesies boleh mengganggu keseimbangan alam.',
    extraKeyPoints: [
      'Adaptasi struktur: ciri fizikal badan sesuai dengan habitat.',
      'Adaptasi tingkah laku: tindakan haiwan untuk kelangsungan hidup.',
      'Kamuflaj membantu haiwan menyamar daripada pemangsa atau mangsa.',
      'Berhijrah, hibernasi, dan berkembang biak musim tertentu ialah adaptasi tingkah laku.',
      'Spesies terancam berisiko pupus jika habitat dan populasi tidak dilindungi.',
      'Taman negara melindungi habitat asli haiwan liar.',
      'Pemeliharaan biodiversiti penting untuk keseimbangan ekosistem.',
    ],
    extraVocabulary: [
      { term: 'habitat', definition: 'Tempat tinggal semula jadi sesuatu organisma' },
      { term: 'adaptasi struktur', definition: 'Ciri fizikal badan yang membantu organisma hidup dalam persekitarannya' },
      { term: 'adaptasi tingkah laku', definition: 'Tindakan organisma untuk meningkatkan peluang hidup' },
      { term: 'kamuflaj', definition: 'Penyamaran warna atau corak dengan persekitaran' },
      { term: 'berhijrah', definition: 'Pergerakan haiwan ke kawasan lain mengikut musim' },
      { term: 'hibernasi', definition: 'Tidur musim sejuk untuk menjimatkan tenaga' },
      { term: 'biodiversiti', definition: 'Kepelbagaian spesies hidupan dalam sesuatu kawasan' },
    ],
    extraRecap:
      'Haiwan mempunyai adaptasi struktur dan tingkah laku untuk bertahan dalam habitat. Lindungi spesies terancam dan habitat mereka demi kepelbagaian biologi.',
  },

  '4-4': {
    extraExplanation:
      'Tumbuhan mempunyai struktur khas yang membolehkan mereka menjalankan fotosintesis dan tumbuh. Daun ialah organ utama fotosintesis dan terdiri daripada beberapa bahagian: epidermis atas dan bawah melindungi daun, mesofil palisad dan mesofil spon mengandungi kloroplas untuk menyerap cahaya, stomata pada epidermis bawah mengawal pertukaran gas dan transpirasi, manakala urat daun mengangkut air dan hasil fotosintesis. Akar menyerap air dan mineral dari tanah, batang menyokong tumbuhan dan mengangkut bahan, manakala daun menghasilkan makanan. Pertumbuhan tumbuhan dipengaruhi oleh faktor persekitaran: cahaya (untuk fotosintesis), air (untuk turgid sel), suhu (menentukan kadar tindak balas enzim), dan nutrien/mineral (untuk pembentukan bahan tumbuhan). Fototropisme ialah pertumbuhan tumbuhan ke arah cahaya, disebabkan oleh hormon auxin yang mengumpul di bahagian daun yang kurang cahaya, menyebabkan sel memanjang lebih cepat. Tumbuhan yang kekurangan air menjadi layu kerana sel kehilangan turgid, manakala kekurangan cahaya menyebabkan tumbuhan kuning dan lemah.',
    extraKeyPoints: [
      'Struktur daun: epidermis, mesofil, stomata, dan urat daun.',
      'Stomata mengawal masuk keluar gas dan keluar air (transpirasi).',
      'Fototropisme: tumbuhan tumbuh ke arah sumber cahaya.',
      'Faktor pertumbuhan: cahaya, air, suhu, dan mineral tanah.',
      'Akar menyerap air dan mineral; batang mengangkut ke daun.',
      'Kekurangan air menyebabkan layu; kekurangan cahaya menyebabkan kuning.',
      'Memahami keperluan tumbuhan penting dalam pertanian dan berkebun.',
    ],
    extraVocabulary: [
      { term: 'epidermis', definition: 'Lapisan sel luar daun yang melindungi tisu dalam' },
      { term: 'mesofil', definition: 'Tisu daun tempat fotosintesis berlaku' },
      { term: 'kloroplas', definition: 'Organel hijau dalam sel tumbuhan yang mengandungi klorofil' },
      { term: 'fototropisme', definition: 'Pertumbuhan tumbuhan ke arah cahaya' },
      { term: 'auxin', definition: 'Hormon tumbuhan yang mengawal pertumbuhan arah cahaya' },
      { term: 'turgid', definition: 'Keadaan sel penuh air dan kukuh' },
      { term: 'nutrien', definition: 'Bahan makanan diperlukan tumbuhan untuk tumbuh sihat' },
    ],
    extraRecap:
      'Daun mempunyai struktur khas untuk fotosintesis. Cahaya, air, suhu, dan nutrien mempengaruhi pertumbuhan. Tumbuhan condong ke arah cahaya melalui fototropisme.',
  },

  '4-5': {
    extraExplanation:
      'Tumbuhan menjalankan tiga proses hidup utama yang saling berkait: fotosintesis, respirasi, dan transpirasi. Fotosintesis berlaku pada waktu siang apabila cahaya matahari tersedia. Klorofil dalam daun menyerap cahaya dan menggunakan karbon dioksida serta air untuk menghasilkan glukosa (makanan) dan oksigen. Persamaan ringkas: karbon dioksida + air + cahaya → glukosa + oksigen. Respirasi berlaku pada semua masa — siang dan malam — di semua bahagian tumbuhan. Glukosa dipecahkan dengan bantuan oksigen untuk melepaskan tenaga, karbon dioksida, dan air. Tenaga ini digunakan untuk pertumbuhan, pengangkutan bahan, dan proses hidup lain. Transpirasi ialah penyejatan air dari permukaan daun melalui stomata. Apabila air menyejat, ia mencipta daya sedutan yang menarik air dari akar melalui xilem ke daun — seperti sedutan minuman melalui straw. Pada hari panas, transpirasi meningkat dan tumbuhan boleh layu jika air tidak diganti cukup cepat. Ketiga-tiga proses ini mengekalkan keseimbangan tumbuhan: fotosintesis menghasilkan makanan, respirasi menggunakan makanan untuk tenaga, transpirasi mengangkut air ke seluruh tumbuhan.',
    extraKeyPoints: [
      'Fotosintesis: siang hari, hasilkan glukosa dan oksigen dari CO₂ dan air.',
      'Respirasi: sepanjang masa, hasilkan tenaga, keluarkan CO₂ dan air.',
      'Transpirasi: penyejatan air dari daun melalui stomata.',
      'Transpirasi mencipta daya sedutan untuk mengangkut air dari akar.',
      'Fotosintesis dan respirasi adalah proses songsang antara satu sama lain.',
      'Tumbuhan layu pada hari panas kerana transpirasi tinggi.',
      'Keseimbangan ketiga proses penting untuk kelangsungan hidup tumbuhan.',
    ],
    extraVocabulary: [
      { term: 'fotosintesis', definition: 'Proses tumbuhan membuat makanan menggunakan cahaya, air, dan CO₂' },
      { term: 'respirasi', definition: 'Proses melepaskan tenaga dari glukosa dengan bantuan oksigen' },
      { term: 'transpirasi', definition: 'Penyejatan air dari tumbuhan melalui stomata daun' },
      { term: 'glukosa', definition: 'Jenis gula hasil fotosintesis yang menjadi makanan tumbuhan' },
      { term: 'klorofil', definition: 'Zat hijau dalam daun yang menyerap cahaya untuk fotosintesis' },
      { term: 'daya sedutan', definition: 'Daya tarikan yang menarik air ke atas melalui xilem' },
      { term: 'xilem', definition: 'Saluran pengangkutan air dan mineral dari akar ke daun' },
    ],
    extraRecap:
      'Fotosintesis buat makanan pada siang, respirasi hasilkan tenaga sepanjang masa, transpirasi angkut air dari akar ke daun. Ketiga-tiga proses saling berkait.',
  },

  '4-6': {
    extraExplanation:
      'Cahaya ialah bentuk tenaga yang membolehkan kita melihat. Cahaya bergerak lurus dalam medium yang seragam seperti udara. Apabila cahaya mengenai permukaan licin seperti cermin, ia dipantulkan — sudut tuju sama dengan sudut pantulan. Pantulan juga berlaku pada permukaan air yang tenang. Pembiasan berlaku apabila cahaya melintasi medium berbeza ketumpatan, seperti dari udara ke air atau melalui kanta. Cahaya berbelok ke arah normal apabila memasuki medium lebih padat. Kanta cembung membiaskan cahaya ke satu titik (fokus) dan digunakan dalam kanta mata jauh dan pembesar. Kanta cekung menyebarkan cahaya dan digunakan dalam kanta mata rabun dekat. Cermin cekung membentuk imej nyata atau maya bergantung pada kedudukan objek. Cermin cembung sentiasa membentuk imej maya, kecil, dan tegak — digunakan sebagai cermin sisi kereta. Pelangi terbentuk apabila cahaya putih matahari dibiaskan dan dipantulkan oleh titisan air — cahaya putih sebenarnya terdiri daripada pelbagai warna (merah, oren, kuning, hijau, biru, nila, ungu). Bayang-bayang terbentuk apabila cahaya disekat oleh objek legap.',
    extraKeyPoints: [
      'Cahaya bergerak lurus; tidak boleh melengkung tanpa medium atau kanta.',
      'Sudut tuju = sudut pantulan pada permukaan licin.',
      'Pembiasan: cahaya belok apabila melalui medium berbeza.',
      'Kanta cembung memfokuskan cahaya; kanta cekung menyebarkan cahaya.',
      'Cermin cekung dan cembung membentuk imej melalui pantulan.',
      'Pelangi terbentuk daripada pembiasan dan pantulan cahaya putih.',
      'Cahaya putih terdiri daripada spektrum pelbagai warna.',
    ],
    extraVocabulary: [
      { term: 'pantulan', definition: 'Pemantulan cahaya dari permukaan licin' },
      { term: 'pembiasan', definition: 'Pembengkokan cahaya apabila melintasi medium berbeza' },
      { term: 'kanta cembung', definition: 'Kanta menumpul di tengah yang memfokuskan cahaya' },
      { term: 'kanta cekung', definition: 'Kanta lekuk di tengah yang menyebarkan cahaya' },
      { term: 'imej nyata', definition: 'Imej yang boleh ditangkap pada skrin' },
      { term: 'imej maya', definition: 'Imej yang tidak boleh ditangkap pada skrin tetapi boleh dilihat' },
      { term: 'spektrum cahaya', definition: 'Pecahan cahaya putih kepada pelbagai warna' },
    ],
    extraRecap:
      'Cahaya bergerak lurus, dipantul pada permukaan licin, dan dibiaskan melalui kanta atau air. Kanta dan cermin membentuk imej; pelangi menunjukkan cahaya putih ada pelbagai warna.',
  },

  '4-7': {
    extraExplanation:
      'Bunyi dihasilkan apabila objek bergetar. Getaran ini menyebabkan zarah dalam medium (pepejal, cecair, atau gas) bergetar dan menghantar tenaga bunyi. Bunyi memerlukan medium untuk merambat — ia tidak boleh merambat dalam vakum (ruang tanpa udara). Bunyi merambat paling cepat dalam pepejal kerana zarah pepejal rapat, diikuti cecair, dan paling perlahan dalam gas. Kelangsingan (frekuensi) ialah bilangan getaran dalam satu saat, diukur dalam hertz (Hz). Kelangsingan tinggi menghasilkan nada tinggi seperti suara kanak-kanak perempuan, manakala kelangsingan rendah menghasilkan nada rendah seperti gong. Kenyaringan (amplitud) pula menentukan kekuatan bunyi — amplitud besar menghasilkan bunyi kuat, amplitud kecil menghasilkan bunyi lemah. Bunyi diukur dalam desibel (dB). Bunyi melebihi 85 dB boleh merosakkan pendengaran. Refleksi bunyi menyebabkan gema — bunyi dipantul dari permukaan keras seperti dinding gua atau bangunan. Kelawar menggunakan echolocation: menghantar bunyi ultrasonic (frekuensi tinggi) dan mengesan pantulan untuk menentukan kedudukan objek dalam gelap.',
    extraKeyPoints: [
      'Bunyi dari getaran objek; getaran berhenti, bunyi berhenti.',
      'Bunyi perlukan medium; tidak merambat dalam vakum.',
      'Kelangsingan tinggi = nada tinggi; kelangsingan rendah = nada rendah.',
      'Kenyaringan besar = bunyi kuat; kenyaringan kecil = bunyi lemah.',
      'Bunyi merambat paling laju dalam pepejal, paling perlahan dalam gas.',
      'Gema ialah pantulan bunyi dari permukaan keras.',
      'Bunyi terlalu kuat boleh merosakkan pendengaran.',
    ],
    extraVocabulary: [
      { term: 'getaran', definition: 'Gerakan ulang-alik pantas objek yang menghasilkan bunyi' },
      { term: 'kelangsingan', definition: 'Bilangan getaran per saat; menentukan nada bunyi' },
      { term: 'kenyaringan', definition: 'Kekuatan atau kelantangan bunyi ditentukan amplitud' },
      { term: 'nada', definition: 'Tinggi atau rendahnya bunyi ditentukan kelangsingan' },
      { term: 'hertz', definition: 'Unit pengukuran kelangsingan (getaran per saat)' },
      { term: 'gema', definition: 'Bunyi yang dipantul dan didengar berulang' },
      { term: 'echolocation', definition: 'Teknik mengesan objek menggunakan pantulan bunyi' },
    ],
    extraRecap:
      'Bunyi dari getaran dan perlukan medium. Kelangsingan tentukan nada, kenyaringan tentukan kuat atau lemah. Gema ialah pantulan bunyi.',
  },

  '4-8': {
    extraExplanation:
      'Setiap bahan mempunyai sifat fizikal yang menentukan kegunaannya. Konduktor haba dan elektrik seperti logam (tembaga, aluminium, besi) membenarkan haba dan arus elektrik mengalir dengan mudah — porang digunakan untuk memasak kerana ia konduktor haba baik. Insulator seperti plastik, kayu, getah, dan kaca menghalang aliran haba dan elektrik — wayar elektrik dibalut plastik untuk keselamatan. Bahan telus membenarkan cahaya melalui sepenuhnya seperti kaca dan air jernih, manakala legap tidak membenarkan cahaya seperti kayu dan logam. Bahan separa telus membenarkan cahaya separa seperti kertas oren. Kekenyalan: getah dan spring elastik, manakala tanah liat plastik. Kekerasan: berlian paling keras, kapur lembut. Pemilihan bahan yang betul mengurangkan kesan alam sekitar — plastik sukar terurai (450 tahun), manakala kertas dan kayu terbiodegradasi lebih cepat. Kitar semula mengurangkan sisa pepejal dan menjimatkan sumber. Bahan boleh dikitar semula termasuk kertas, kaca, logam, dan plastik tertentu.',
    extraKeyPoints: [
      'Konduktor: logam membenarkan haba dan elektrik mengalir.',
      'Insulator: plastik, kayu, getah menghalang aliran haba dan elektrik.',
      'Telus: kaca dan air jernih; legap: kayu dan logam.',
      'Sifat bahan menentukan kegunaan dalam kehidupan harian.',
      'Plastik sukar terurai; kertas dan kayu lebih mesra alam.',
      'Kitar semula mengurangkan sisa dan menjimatkan sumber.',
      'Pemilihan bahan bijak mengurangkan kesan negatif terhadap alam sekitar.',
    ],
    extraVocabulary: [
      { term: 'konduktor', definition: 'Bahan yang membenarkan haba atau elektrik mengalir' },
      { term: 'insulator', definition: 'Bahan yang menghalang aliran haba atau elektrik' },
      { term: 'telus', definition: 'Bahan yang membenarkan cahaya melalui sepenuhnya' },
      { term: 'legap', definition: 'Bahan yang tidak membenarkan cahaya melalui' },
      { term: 'terbiodegradasi', definition: 'Bahan yang boleh diuraikan oleh mikroorganisma' },
      { term: 'elastik', definition: 'Bahan yang boleh diregang dan kembali ke bentuk asal' },
      { term: 'kitar semula', definition: 'Proses mengolah semula bahan buangan menjadi produk baharu' },
    ],
    extraRecap:
      'Sifat bahan tentukan kegunaan: konduktor vs insulator, telus vs legap. Kitar semula dan pilih bahan terbiodegradasi untuk kurangkan kesan alam sekitar.',
  },

  '4-9': {
    extraExplanation:
      'Bumi, Bulan, dan Matahari membentuk sistem yang saling berkait. Bumi berputar pada paksinya sekali setiap 24 jam, menyebabkan siang dan malam. Bahagian Bumi yang menghadap Matahari mengalami siang, manakala bahagian bertentangan mengalami malam. Bumi juga mengelilingi Matahari (revoluti) dalam 365¼ hari, menghasilkan perubahan musim. Bulan pula mengelilingi Bumi dalam kira-kira 29.5 hari. Fasa bulan berubah kerana kita melihat bahagian bulan yang diterangi Matahari dari Bumi — purnama (bulan penuh), bulan sabit (separuh), bulan baharu (hampir tidak kelihatan), dan suku pertama/keempat. Graviti ialah daya tarikan antara jasad berjisim. Graviti Bumi menahan objek dan air laut di permukaan. Graviti Bulan dan Matahari menyebabkan pasang surut — paras air laut naik (pasang) dan turun (surut) dua kali sehari. Bulan tidak mempunyai cahaya sendiri; ia memantulkan cahaya Matahari. Satu hari di Bulan bersamaan kira-kira 29 hari di Bumi kerana bulan mengambil masa yang sama untuk berputar dan mengelilingi Bumi.',
    extraKeyPoints: [
      'Putaran Bumi (24 jam) → siang dan malam.',
      'Revoluti Bumi (365 hari) → perubahan musim.',
      'Fasa bulan: baharu, sabit, suku, purnama — berulang setiap ~29.5 hari.',
      'Bulan mengelilingi Bumi; tidak menghasilkan cahaya sendiri.',
      'Graviti Bumi menahan objek dan air di permukaan.',
      'Pasang surut akibat tarikan graviti Bulan dan Matahari.',
      'Matahari ialah sumber cahaya dan haba utama Bumi.',
    ],
    extraVocabulary: [
      { term: 'putaran', definition: 'Pergerakan Bumi berpusing pada paksinya' },
      { term: 'revoluti', definition: 'Pergerakan Bumi mengelilingi Matahari' },
      { term: 'fasa bulan', definition: 'Bentuk bulan yang kelihatan dari Bumi' },
      { term: 'graviti', definition: 'Daya tarikan antara jasad yang mempunyai jisim' },
      { term: 'pasang surut', definition: 'Kenaikan dan penurunan paras air laut' },
      { term: 'purnama', definition: 'Fasa bulan apabila seluruh permukaan kelihatan terang' },
      { term: 'satelit semula jadi', definition: 'Jasad astronomi yang mengorbit planet; Bulan ialah satelit Bumi' },
    ],
    extraRecap:
      'Bumi berputar (siang malam) dan mengelilingi Matahari (musim). Bulan ada fasa berbeza. Graviti menahan objek; pasang surut berkait tarikan Bulan dan Matahari.',
  },

  '4-10': {
    extraExplanation:
      'Teknologi memudahkan kehidupan manusia dalam pelbagai bidang. Teknologi komunikasi seperti telefon, internet, e-mel, dan aplikasi pesanan membolehkan orang berkomunikasi serta-merta tanpa mengira jarak. Teknologi maklumat seperti komputer, tablet, dan enjin carian membantu pembelajaran dan penyelidikan. Teknologi perubatan seperti X-ray, CT scan, mikroskop, dan ubat-ubatan membantu diagnosis dan rawatan penyakit. Teknologi pengangkutan seperti kereta, bas, LRT, kapal terbang, dan kapal menjadikan perjalanan lebih cepat dan mudah. Teknologi hijau seperti panel solar, turbin angin, kenderaan elektrik, dan sistem kitar semula mengurangkan pencemaran dan menjimatkan sumber. Walau bagaimanapun, teknologi perlu digunakan secara beretika — tidak menyalahgunakan internet, menghormati privasi orang lain, tidak menyalin kerja tanpa kebenaran, dan mengelakkan ketagihan gajet. Setiap pengguna bertanggungjawab memilih teknologi yang mesra alam dan mengimbangi manfaat dengan kesan negatif terhadap kesihatan dan alam sekitar.',
    extraKeyPoints: [
      'Teknologi komunikasi: telefon, internet, e-mel memudahkan hubungan.',
      'Teknologi perubatan: X-ray, ubat, alat diagnostik menyelamatkan nyawa.',
      'Teknologi pengangkutan: kereta, LRT, kapal terbang memudahkan perjalanan.',
      'Teknologi hijau mengurangkan pencemaran dan menjimatkan sumber.',
      'GPS menggunakan satelit untuk menentukan lokasi.',
      'Etika penting: guna teknologi secara bertanggungjawab dan hormati privasi.',
      'Imbangi manfaat teknologi dengan kesan terhadap kesihatan dan alam sekitar.',
    ],
    extraVocabulary: [
      { term: 'teknologi maklumat', definition: 'Teknologi untuk mengumpul, menyimpan, dan menyebarkan maklumat' },
      { term: 'teknologi hijau', definition: 'Teknologi yang mesra alam dan lestari' },
      { term: 'inovasi', definition: 'Penambahbaikan atau ciptaan baharu yang berguna' },
      { term: 'etika', definition: 'Prinsip moral yang mengawal tingkah laku' },
      { term: 'GPS', definition: 'Sistem Penentuan Kedudukan Global menggunakan satelit' },
      { term: 'diagnostik', definition: 'Proses mengenal pasti penyakit atau masalah' },
      { term: 'digital', definition: 'Berkaitan teknologi yang menggunakan data dalam bentuk nombor' },
    ],
    extraRecap:
      'Teknologi memudahkan komunikasi, kesihatan, dan pengangkutan. Gunakan secara beretika, utamakan teknologi hijau, dan imbangi manfaat dengan kesan alam sekitar.',
  },
};