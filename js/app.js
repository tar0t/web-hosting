// Lottery Javascript

// DB作成
var db = new Dexie("AppDataset");
var db_version = 1;	
// ストア作成
db.version(db_version).stores({
	dataset: "++id, value1, value2"
});

// ファイル読み込みボタン押下
$(function(){
	$('#btn-load-file').click(function(){
		console.log("click btn-load-file");
		$('#file-load-file').click();
	});

	$('#file-load-file').change(function(){
		console.log("change file-load-file");
		if(this.files.length > 0){
			var file = this.files[0];
			reader.readAsText(file);
		}
	});
});

// ファイル読み込み
var reader = new FileReader();
var dataset = null;
reader.onload = (function(){
	Papa.parse(reader.result, {
		skipEmptyLines: 'greedy',
		complete: function(results){
			if(results.data.length > 0 && results.data[0].length == 2){
				dataset = results.data;
				showDataTable(results.data);
			} else {
				show_message("CSVの形式を2列「名前,フリガナ」にしてください。");
				clear_dataset();
			}
		}
	});
	
	// ボタン表示を切り替え
	if(dataset != null){
		$('div#load-file').attr('style','display:none');
		$('div#register-data').attr('style','display:block');
	}
});

// データ登録
$('#btn-register').click(function(){
	if(dataset != null){
		db.dataset.clear();
		db.dataset.bulkAdd(dataset);
		
		show_message("データ登録:" + dataset.length + "個");
		console.log("データ登録:" + dataset.length + " records.");
		
		// データセットクリア
		clear_dataset();
		// ボタン表示を切り替え
		$('div#load-file').attr('style','display:block');
		$('div#register-data').attr('style','display:none');
	}
});

// 登録キャンセル
$('#btn-cancel').click(function(){
	// データセットクリア
	clear_dataset();
	// ボタン表示を切り替え
	$('div#load-file').attr('style','display:block');
	$('div#register-data').attr('style','display:none');
});

// メッセージ表示
function show_message(str){
	$('#sn1').text(str);
	showsnackbar('sn1');
}

// 読み込んだデータセットをクリア
function clear_dataset(){
	// データセット読み込み取り消し
	$('#view-dataset table').empty();
	$('#file-load-file').val('');
	dataset = null;
}

// データセットをテーブルに表示
// dataset: [[x1,y1],[x2,y2],...]
function showDataTable(dataset){
	var tableSelector = '#view-dataset table';
	// テーブルを空にしてから追加
	$(tableSelector).empty();
	$('<tr>')
		.append($('<th>').attr('id','dataset_no').text("No."))
		.append($('<th>').attr('id','dataset_kanji').text("名前"))
		.append($('<th>').attr('id','dataset_furigana').text("フリガナ"))
		.appendTo($(tableSelector));
	for(var i=0;i < dataset.length;i++){
		var data = dataset[i];
		$('<tr>')
			.append($('<td>').text(""+(i+1)))
			.append($('<td>').text(data[0]))
			.append($('<td>').text(data[1]))
			.appendTo($(tableSelector));
	}
}

// データセットからランダム抽出
function random_pickup(namelist){
    // 社員名簿から抽選
    var idx = Math.floor(Math.random() * namelist.length);
	
    // 名前とフリガナを表示
	var kanji = namelist[idx][0];
    var furigana = namelist[idx][1];
    
    $("#kanji").text(kanji);
    $("#furigana").text(furigana);	
}

$(function(){
  $("#pickup").click(function(){
	  db.dataset.toArray().then(function(list){
		  if(list.length > 0){
			random_pickup(list);
		  } else {
			alert("データがありません");
		  }
	  })
  });
});
