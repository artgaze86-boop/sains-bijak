export interface NoteEnrichment {
  extraExplanation: string;
  extraKeyPoints: string[];
  extraVocabulary: { term: string; definition: string }[];
  extraRecap: string;
}

export const ENRICHMENT_Y6: Record<string, NoteEnrichment> = {
  '6-1': {
    extraExplanation:
      'Tahun 6 merupakan tahun persediaan UPSR di mana murid perlu menguasai penyiasatan saintifik secara menyeluruh. Penyiasatan bermula dengan mengenal pasti masalah, menyatakan latar belakang, merumus hipotesis, merancang metodologi, menjalankan eksperimen, merekod data, menganalisis keputusan, membuat kesimpulan dan menulis laporan. Pembolehubah mengganggu seperti suhu bilik, cahaya atau kelembapan perlu dikawal atau didokumentasikan. Inferens ialah kesimpulan awal berdasarkan pemerhatian, manakala generalisasi memerlukan data yang mencukupi dan boleh dipercayai. Etika penyelidikan termasuk tidak memanipulasi data, menghormati hak haiwan ujian, dan mematuhi keselamatan makmal. Komunikasi hasil melalui laporan formal, poster dan pembentangan lisan mengukuhkan pemahaman.',
    extraKeyPoints: [
      'Struktur laporan: tajuk, abstrak, pengenalan, kaedah, keputusan, perbincangan, kesimpulan.',
      'Jadual kekerapan dan carta pai membantu menyajikan data kategorikal.',
      'Ujian kebolehulangan: ulang eksperimen untuk mengesahkan keputusan.',
      'Pembolehubah bergantung: faktor yang berubah mengikut perubahan pembolehubah dimalarkan.',
      'Sumber rujukan perlu disenaraikan dalam laporan saintifik.',
      'Soalan KBAT memerlukan analisis, sintesis dan penilaian maklumat.',
    ],
    extraVocabulary: [
      { term: 'abstrak', definition: 'Ringkasan ringkas keseluruhan penyiasatan' },
      { term: 'kebolehulangan', definition: 'Keupayaan mendapat keputusan serupa apabila eksperimen diulang' },
      { term: 'inferens', definition: 'Kesimpulan awal berdasarkan pemerhatian dan bukti' },
      { term: 'sintesis', definition: 'Menggabungkan maklumat dari pelbagai sumber untuk membuat kesimpulan' },
    ],
    extraRecap:
      'Rancang penyiasatan lengkap dari hipotesis hingga laporan. Kawal pembolehubah mengganggu, amalkan etika dan komunikasikan hasil secara formal untuk persediaan UPSR.',
  },

  '6-2': {
    extraExplanation:
      'Mikroorganisma merangkumi bakteria, arkea, fungi, protozoa, alga dan virus. Bakteria bersel tunggal dan prokariot — ada yang berguna seperti Lactobacillus dalam yogurt dan E. coli dalam usus, ada yang berbahaya seperti Salmonella dan Mycobacterium. Fungi seperti kulat dan ragi digunakan dalam pembuatan roti, tapai dan antibiotik penicillin. Virus seperti influenza dan COVID-19 memerlukan sel hidup untuk membiak dan tidak boleh dirawat dengan antibiotik. Mikroorganisma berperanan dalam kitar nutrien, penghasilan ubat, penapaian makanan dan bioremediasi. Pencegahan penyakit melalui kebersihan diri, sterilisasi alat, pasteur susu, pengawetan makanan dan vaksinasi.',
    extraKeyPoints: [
      'Bakteria dibahagikan kepada gram positif dan gram negatif berdasarkan dinding sel.',
      'Antibiotik hanya berkesan terhadap bakteria, bukan virus.',
      'Vaksin merangsang sistem imun menghasilkan antibodi.',
      'Kultur mikroorganisma memerlukan medium sesuai, suhu dan kelembapan.',
      'Mikroorganisma aeroob memerlukan oksigen; anaerob tidak memerlukan oksigen.',
      'Penyakit berjangkit merebak melalui udara, air, makanan dan sentuhan.',
    ],
    extraVocabulary: [
      { term: 'antibodi', definition: 'Protein dalam badan yang melawan jangkitan' },
      { term: 'kultur', definition: 'Pembiakan mikroorganisma dalam medium terkawal' },
      { term: 'sterilisasi', definition: 'Proses membunuh semua mikroorganisma pada objek' },
      { term: 'bioremediasi', definition: 'Penggunaan mikroorganisma untuk membersihkan pencemaran' },
    ],
    extraRecap:
      'Mikroorganisma ada berguna dan berbahaya. Amalkan kebersihan, vaksinasi dan pengawetan makanan. Antibiotik untuk bakteria, bukan virus.',
  },

  '6-3': {
    extraExplanation:
      'Dalam ekosistem, organisma saling berinteraksi untuk mendapatkan makanan, ruang dan pasangan. Simbiosis mutualisme memberi manfaat kedua-dua pihak seperti lebah dan bunga, dan bakteria rhizobium dengan kekacang. Komensalisme memberi manfaat kepada satu pihak tanpa memberi kesan kepada yang lain, seperti ikan remora pada jerung. Parasitisme memberi manfaat kepada parasit tetapi merugikan tuan rumah, seperti cacing parasit dan tumbuhan jeruju. Persaingan intra-spesies (dalam spesies sama) dan inter-spesies (antara spesies berbeza) berlaku untuk sumber terhad. Rantaian makanan menunjukkan aliran tenaga linear, manakala rangkaian makanan menunjukkan hubungan kompleks. Gangguan seperti pemusnahan habitat boleh menyebabkan kesan domino terhadap spesies lain.',
    extraKeyPoints: [
      'Pengeluar (produser): tumbuhan hijau membuat makanan melalui fotosintesis.',
      'Pengguna primer: herbivor makan tumbuhan; pengguna sekunder: karnivor makan herbivor.',
      'Pengurai memecahkan bahan organik mati dan mengitar semula nutrien.',
      'Tenaga berkurang pada setiap aras trofik — hanya 10% tenaga dipindahkan.',
      'Spesies kunci seperti pemangsa puncak mengekalkan keseimbangan ekosistem.',
      'Bioakumulasi: racun terkumpul dalam organisma pada aras trofik tinggi.',
    ],
    extraVocabulary: [
      { term: 'aras trofik', definition: 'Kedudukan organisma dalam rantaian makanan' },
      { term: 'pengurai', definition: 'Organisma yang memecahkan bahan organik mati' },
      { term: 'bioakumulasi', definition: 'Pengumpulan bahan beracun dalam organisma hidup' },
      { term: 'intra-spesies', definition: 'Interaksi antara organisma spesies yang sama' },
    ],
    extraRecap:
      'Interaksi hidupan termasuk mutualisme, komensalisme, parasitisme dan persaingan. Rantaian dan rangkaian makanan menunjukkan aliran tenaga. Keseimbangan ekosistem perlu dipelihara.',
  },

  '6-4': {
    extraExplanation:
      'Pemeliharaan (conservation) bertujuan melindungi spesies dan habitat dari ancaman seperti penebangan, pencemaran, pemburuan haram dan perubahan iklim. Pemuliharaan (restoration) pula memulihkan kawasan yang telah rosak melalui penanaman semula, pembersihan sungai dan pemulihan tanah gambut. Malaysia mempunyai taman negara, taman laut, rizab hidupan liar dan taman negeri sebagai kawasan perlindungan. Spesies terancam seperti gajah Asia, badak sumbu, orang utan dan penyu dilindungi di bawah Akta Pemuliharaan Hidupan Liar. Biodiversiti tinggi menyediakan perkhidmatan ekosistem seperti penyerbukan, penapis air, dan penyimpanan karbon. Setiap warganegara boleh menyumbang melalui kitar semula, mengurangkan plastik, menanam pokok dan menyokong kempen kesedaran alam sekitar.',
    extraKeyPoints: [
      'Kawasan perlindungan (protected areas) melindungi habitat asli spesies.',
      'Pembiakan terkawal membantu meningkatkan populasi spesies terancam.',
      'Ekopelancongan menyediakan pendapatan sambil melindungi alam.',
      'Perdagangan hidupan liar haram mengancam kemandirian spesies.',
      'Kepupusan spesies mengurangkan biodiversiti dan kestabilan ekosistem.',
      'Program adopt-a-tree dan gotong-royong membersihkan sungai menyokong pemuliharaan.',
    ],
    extraVocabulary: [
      { term: 'ekopelancongan', definition: 'Pelancongan yang menghormati dan melindungi alam sekitar' },
      { term: 'habitat', definition: 'Tempat tinggal semula jadi organisma' },
      { term: 'kepupusan', definition: 'Hilangnya spesies dari muka bumi' },
      { term: 'rizab', definition: 'Kawasan yang dilindungi untuk hidupan liar' },
    ],
    extraRecap:
      'Pemeliharaan melindungi, pemuliharaan memulih. Biodiversiti penting untuk kestabilan alam. Sertai usaha jaga spesies terancam dan habitat.',
  },

  '6-5': {
    extraExplanation:
      'Daya ialah tarikan atau tolakan yang boleh mengubah bentuk, kelajuan, arah atau saiz objek. Daya diukur dalam newton (N) menggunakan dinamometer atau neraca spring. Hukum Newton Pertama: objek kekal dalam keadaan rehat atau bergerak seragam melainkan daya luar bertindak. Hukum Newton Kedua: daya = jisim × pecutan (F = ma). Hukum Newton Ketiga: setiap tindakan ada tindak balas yang sama besar tetapi bertentangan arah. Graviti ialah daya tarikan Bumi terhadap objek — jisim objek menentukan graviti, bukan berat semata. Geseran melawan gerakan relatif antara permukaan. Daya tindakan dan daya reaksi berlaku serentak pada objek berbeza, seperti roket menolak gas ke bawah dan gas menolak roket ke atas.',
    extraKeyPoints: [
      'Berat = jisim × graviti (W = mg); graviti Bumi ≈ 10 N/kg.',
      'Daya bersih (daya tidak seimbang) menyebabkan pecutan.',
      'Geseran statik lebih besar daripada geseran kinetik.',
      'Daya sentripetal membuat objek bergerak dalam laluan bulat.',
      'Kesetimbangan statik: objek rehat dengan daya seimbang.',
      'Kesetimbangan dinamik: objek bergerak seragam dengan daya seimbang.',
    ],
    extraVocabulary: [
      { term: 'pecutan', definition: 'Kadar perubahan kelajuan objek' },
      { term: 'berat', definition: 'Daya tarikan graviti terhadap objek' },
      { term: 'daya bersih', definition: 'Hasil tambah semua daya yang bertindak pada objek' },
      { term: 'geseran statik', definition: 'Geseran yang menghalang objek mula bergerak' },
    ],
    extraRecap:
      'Daya diukur dalam newton. Fahami hukum Newton dan jenis daya seperti graviti dan geseran. Kesetimbangan berlaku apabila daya sama besar bertentangan arah.',
  },

  '6-6': {
    extraExplanation:
      'Kelajuan menunjukkan jarak yang dilalui dalam unit masa. Formula asas: kelajuan = jarak ÷ masa (v = s/t). Unit SI ialah meter sesaat (m/s), manakala km/j biasa digunakan untuk kenderaan. Kelajuan seketika ialah kelajuan pada satu masa tertentu, manakala kelajuan purata ialah jumlah jarak dibahagi jumlah masa keseluruhan perjalanan. Graf jarak-masa menunjukkan pergerakan: garis condong = bergerak, garis mendatar = rehat, garis condong curam = laju. Pecutan ialah kadar perubahan kelajuan: pecutan = perubahan kelajuan ÷ masa. Kelajuan berbeza dalam pelbagai situasi — pejalan kaki 5 km/j, pelari 15 km/j, kereta di lebuh raya 110 km/j. Had laju ditetapkan untuk keselamatan jalan raya.',
    extraKeyPoints: [
      'Tukar unit: 1 m/s = 3.6 km/j.',
      'Kelajuan seragam: jarak sama dilalui dalam setiap selang masa sama.',
      'Kelajuan tidak seragam: kelajuan berubah-ubah sepanjang perjalanan.',
      'Jarak = kelajuan × masa (s = v × t).',
      'Graf kelajuan-masa: luas di bawah graf = jarak dilalui.',
      'Membrek menunjukkan pecutan negatif (nyahpecutan).',
    ],
    extraVocabulary: [
      { term: 'kelajuan seketika', definition: 'Kelajuan objek pada satu masa tertentu' },
      { term: 'nyahpecutan', definition: 'Pecutan negatif apabila kelajuan berkurang' },
      { term: 'graf jarak-masa', definition: 'Graf menunjukkan jarak dilalui mengikut masa' },
      { term: 'unit SI', definition: 'Sistem unit antarabangsa untuk pengukuran saintifik' },
    ],
    extraRecap:
      'Kelajuan = jarak/masa. Bezakan kelajuan seragam, purata dan seketika. Baca graf pergerakan dan patuhi had laju untuk keselamatan.',
  },

  '6-7': {
    extraExplanation:
      'Pengawetan makanan bertujuan menghalang atau melambatkan pertumbuhan mikroorganisma yang merosakkan makanan. Kaedah tradisional Malaysia termasuk masin ikan, asin jeruk, kering ikan bilis, tapai pulut, dodol dan belacan. Kaedah moden termasuk pasteurisasi (panaskan 72°C selama 15 saat untuk susu), ultra-high temperature (UHT), penyejukan (suhu 0-4°C), pembekuan (-18°C), pengeringan (buang air), penggaraman, pengasidan, penggunaan gula, pengetinan (tin), vakum dan sinaran. Setiap kaedah berfungsi dengan mengurangkan air, mengubah pH, menghalang oksigen atau membunuh mikroorganisma. Makanan tersimpan lama perlu diperiksa tanda rosak seperti bau busuk, warna berubah, dan bekas botol.',
    extraKeyPoints: [
      'Air aktiviti rendah menghalang pertumbuhan bakteria dan kulat.',
      'Garam dan gula menarik air keluar dari sel mikroorganisma (osmosis).',
      'Asid cuka menurunkan pH dan menghalang pertumbuhan kuman.',
      'Pembekuan memperlahankan aktiviti enzim dan mikroorganisma.',
      'Tudung tin kedap menghalang oksigen dan pencemaran.',
      'Label tarikh luput membantu mengelakkan makanan rosak.',
    ],
    extraVocabulary: [
      { term: 'pasteurisasi', definition: 'Pemanasan sederhana untuk membunuh kuman berbahaya' },
      { term: 'pengetinan', definition: 'Pengawetan makanan dalam tin tertutup rapat' },
      { term: 'air aktiviti', definition: 'Air tersedia untuk digunakan mikroorganisma' },
      { term: 'pH', definition: 'Ukuran keasidan atau kealkalian sesuatu bahan' },
    ],
    extraRecap:
      'Pengawetan halang mikroorganisma melalui masin, kering, panas, sejuk, asid dan tin. Periksa makanan sebelum dimakan dan pilih kaedah yang selamat.',
  },

  '6-8': {
    extraExplanation:
      'Pengurusan bahan buangan yang betul melindungi kesihatan manusia dan alam sekitar. Sisa pepejal diklasifikasikan kepada sisa domestik, sisa industri, sisa berbahaya dan sisa elektronik (e-sisa). Amalan 3R: Reduce (kurangkan penggunaan), Reuse (guna semula) dan Recycle (kitar semula). Sisa terbiodegradasi seperti sisa makanan boleh dijadikan kompos. Sisa tidak terbiodegradasi seperti plastik dan styrofoam kekal berabad-abad. Pelupusan sisa melalui tapak perlakuan sanitar, insinerasi (pembakaran terkawal) dan penjanaan tenaga dari sisa. Malaysia mengamalkan asing di punca dengan tong berwarna: kuning (kitar semula), oren (sisa terbiodegradasi), hitam (sisa am). Pembuangan sisa merata dan pembakaran terbuka mencemari udara, tanah dan air.',
    extraKeyPoints: [
      'E-sisa mengandungi bahan berbahaya seperti plumbum dan merkuri.',
      'Komposing mengurangkan sisa ke tapak perlakuan dan menghasilkan baja organik.',
      'Kitar semula aluminium menjimatkan 95% tenaga berbanding pengeluaran baharu.',
      'Beg plastik mengambil masa ratusan tahun untuk terurai.',
      'Insinerasi terkawal mengurangkan isipadu sisa tetapi perlu penapis asap.',
      'Kempen zero waste menggalakkan pengurangan sisa dari punca.',
    ],
    extraVocabulary: [
      { term: 'e-sisa', definition: 'Sisa peralatan elektronik seperti telefon dan komputer rosak' },
      { term: 'insinerasi', definition: 'Pembakaran sisa pada suhu tinggi secara terkawal' },
      { term: 'asing di punca', definition: 'Memisahkan sisa mengikut jenis pada tempat asalnya' },
      { term: 'zero waste', definition: 'Konsep mengurangkan sisa sehingga minimum' },
    ],
    extraRecap:
      'Amalkan 3R dan asing di punca. Buat kompos dari sisa organik, kitar semula bahan boleh guna semula dan elakkan pembuangan merata.',
  },

  '6-9': {
    extraExplanation:
      'Gerhana berlaku apabila tiga jasad astronomi — Matahari, Bumi dan Bulan — sejajar dalam garis lurus. Gerhana Matahari berlaku apabila Bulan berada di antara Matahari dan Bumi, menghalang cahaya Matahari sampai ke sesetengah kawasan Bumi. Jenis gerhana Matahari: separa (sebahagian Matahari tertutup), penuh (Matahari tertutup sepenuhnya) dan cincin (Bulan kelihatan lebih kecil, cincin cahaya Matahari kelihatan). Gerhana Bulan berlaku apabila Bumi berada di antara Matahari dan Bulan, menghalang cahaya Matahari sampai ke Bulan. Bulan kelihatan kemerahan kerana cahaya Matahari dibiaskan oleh atmosfera Bumi. Gerhana tidak berlaku setiap bulan kerana orbit Bulan condong 5° berbanding orbit Bumi. Melihat gerhana Matahari tanpa pelindung khas boleh merosakkan retina secara kekal.',
    extraKeyPoints: [
      'Umbra: kawasan bayang penuh; penumbra: kawasan bayang separa.',
      'Gerhana Matahari hanya boleh dilihat dari kawasan kecil di Bumi.',
      'Gerhana Bulan boleh dilihat dari seluruh hemisfera malam.',
      'Purata gerhana Matahari penuh: 2-5 kali setahun di pelbagai lokasi.',
      'Penapis gerhana khas, cermin mata gerhana atau kaedah proyeksi selamat digunakan.',
      'Fenomena berkaitan: pasang surut perbani akibat graviti Bulan dan Matahari.',
    ],
    extraVocabulary: [
      { term: 'umbra', definition: 'Kawasan bayang gelap penuh semasa gerhana' },
      { term: 'penumbra', definition: 'Kawasan bayang separa di sekeliling umbra' },
      { term: 'gerhana cincin', definition: 'Gerhana Matahari apabila Bulan kelihatan lebih kecil daripada Matahari' },
      { term: 'retina', definition: 'Lapisan sensitif cahaya di dalam mata' },
    ],
    extraRecap:
      'Gerhana Matahari: Bulan halang Matahari. Gerhana Bulan: Bumi halang Matahari ke Bulan. Jangan lihat gerhana Matahari tanpa pelindung khas.',
  },

  '6-10': {
    extraExplanation:
      'Buruj ialah corak bintang di langit malam yang dinamakan mengikut bentuk legenda. Bintang dalam buruj kelihatan berhampiran tetapi sebenarnya berada pada jarak berbeza dari Bumi. Buruj Biduk (Ursa Major) ialah buruj paling mudah dikenali di hemisfera utara — dua bintang penunjuk (Merak dan Dubhe) menunjuk ke Polaris, bintang Kutub Utara. Orion, buruj pemburu, mudah dikenali dengan tali pinggang tiga bintang dan Betelgeuse (bahu merah) serta Rigel (kaki biru). Di Malaysia, buruj Scorpius (kala jengking) dan Sagittarius kelihatan jelas. Buruj berubah mengikut musim kerana Bumi berrevolusi mengelilingi Matahari. Orang dahulu menggunakan buruj dan bintang untuk navigasi, penentuan musim tanaman dan penanda waktu.',
    extraKeyPoints: [
      'Magnitud bintang: nombor lebih kecil = bintang lebih terang.',
      'Bintang bersinar kerana tindak balas nuklear fusi hidrogen.',
      'Buruj hemisfera utara berbeza dengan hemisfera selatan.',
      'Pencemaran cahaya bandar menyukarkan pemerhatian buruj.',
      'Planet kelihatan seperti bintang tetapi tidak berkelip dan bergerak.',
      'Teleskop membantu melihat buruj dan objek langit dengan lebih jelas.',
    ],
    extraVocabulary: [
      { term: 'magnitud', definition: 'Ukuran kecerahan bintang dalam skala astronomi' },
      { term: 'bintang penunjuk', definition: 'Dua bintang dalam Buruj Biduk yang menunjuk ke Polaris' },
      { term: 'hemisfera utara', definition: 'Separuh utara Bumi; kelihatan buruj utara' },
      { term: 'pencemaran cahaya', definition: 'Cahaya buatan yang menghalang pemerhatian bintang' },
    ],
    extraRecap:
      'Buruj ialah corak bintang seperti Orion dan Buruj Biduk. Polaris tunjuk utara. Buruj berbeza mengikut musim dan lokasi di Bumi.',
  },

  '6-11': {
    extraExplanation:
      'Mesin kompleks menggabungkan dua atau lebih mesin mudah untuk melaksanakan kerja yang lebih rumit. Basikal menggunakan tuas (pedal), takal (rantai pada gear), roda dan gandar (roda), dan skru (baud pengikat). Kren menggunakan takal berganda untuk mengurangkan daya angkat — setiap tali takal tambahan mengurangkan separuh daya diperlukan. Gear dalam enjin dan jentera menukar kelajuan putaran dan menghantar daya. Nisbah gear dikira: bilangan gigi gear driven ÷ bilangan gigi gear driver. Enjin pembakaran menukar tenaga kimia bahan api kepada tenaga haba dan mekanikal. Penyelenggaraan berkala seperti pelinciran, pemeriksaan brek dan penggantian bahan haus memastikan kecekapan dan keselamatan mesin.',
    extraKeyPoints: [
      'Tuas kelas 3: daya di antara fulkrum dan beban, contoh penyepit dan besbol.',
      'Takal tetap hanya mengubah arah daya, tidak mengurangkan daya.',
      'Gear kecil driver + gear besar driven = kelajuan rendah, daya tinggi.',
      'Transmisi kereta menukar gear untuk kelajuan dan daya optimum.',
      'Enjin dua lejang: lejang naik turun menukar gerakan linear kepada putaran.',
      'Keselamatan mesin: pelindung, tanda amaran dan latihan pengendalian.',
    ],
    extraVocabulary: [
      { term: 'nisbah gear', definition: 'Perbandingan bilangan gigi gear driven dan driver' },
      { term: 'transmisi', definition: 'Sistem menghantar daya dari enjin ke roda' },
      { term: 'enjin pembakaran', definition: 'Enjin yang membakar bahan api untuk menjana gerakan' },
      { term: 'lejang', definition: 'Batang keras yang bergerak naik turun dalam enjin' },
    ],
    extraRecap:
      'Mesin kompleks gabungan tuas, takal, gear dan roda. Fahami nisbah gear dan penyelenggaraan. Mesin memudahkan kerja tetapi tidak mencipta tenaga.',
  },

  '6-12': {
    extraExplanation:
      'Teknologi moden boleh menyokong kehidupan lestari jika digunakan secara bertanggungjawab. Tenaga boleh diperbaharui seperti solar, angin, hidro, biojisim dan geoterma mengurangkan pergantungan pada bahan api fosil. Panel solar menukar cahaya matahari kepada elektrik tanpa menghasilkan gas rumah hijau. Teknologi pintar seperti meter pintar, lampu LED automatik dan sistem pengurusan air membantu memantau dan mengurangkan penggunaan sumber. Pertanian pintar menggunakan sensor untuk mengoptimumkan penggunaan air dan baja. Jejak karbon merujuk jumlah CO₂ dihasilkan aktiviti harian — boleh dikurangkan dengan pengangkutan awam, diet rendah daging dan penjimatan tenaga. Konsep pembangunan lestari memenuhi keperluan kini tanpa menjejaskan generasi akan datang.',
    extraKeyPoints: [
      'Gas rumah hijau: CO₂, metana dan nitrous oksida memerangkap haba.',
      'Perubahan iklim: peningkatan suhu global akibat aktiviti manusia.',
      'Karbon neutral: seimbang antara pelepasan dan penyerapan karbon.',
      'Bahan boleh guna semula menggantikan plastik sekali guna.',
      'Pengangkutan hijau: bas elektrik, kereta api dan basikal.',
      'Pendidikan alam sekitar membentuk generasi yang peka kelestarian.',
    ],
    extraVocabulary: [
      { term: 'gas rumah hijau', definition: 'Gas atmosfera yang memerangkap haba dan memanaskan Bumi' },
      { term: 'karbon neutral', definition: 'Keadaan pelepasan karbon sama dengan penyerapan karbon' },
      { term: 'biojisim', definition: 'Tenaga dari bahan organik seperti sisa tumbuhan' },
      { term: 'pembangunan lestari', definition: 'Pembangunan yang memenuhi keperluan kini tanpa menjejaskan masa depan' },
    ],
    extraRecap:
      'Teknologi hijau dan tenaga diperbaharui sokong kelestarian. Kurangkan jejak karbon dan amalkan gaya hidup lestari setiap hari demi masa depan.',
  },
};