const AWS = require('aws-sdk');

// Lambdaクライアントを作成
const lambda = new AWS.Lambda();

exports.handler = async (event) => {
    const functionName = 'arn:aws:lambda:region:account-id:function:function-name'; // Lambda BのARN

    // Lambda Bに渡すペイロード
    const payload = {
        key: 'value' // 必要なデータをここに追加
    };

    const params = {
        FunctionName: functionName, // 呼び出すLambda関数のARN
        InvocationType: 'RequestResponse', // 同期呼び出し
        Payload: JSON.stringify(payload) // ペイロードをJSON文字列に変換
    };

    try {
        // Lambda Bを同期呼び出し
        const response = await lambda.invoke(params).promise();

        // Lambda Bからのレスポンスをパース
        const responsePayload = JSON.parse(response.Payload);

        // Lambda Bから返された結果を使って処理を行う
        const result = responsePayload.result || 'No result';

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Success',
                result: result
            })
        };

    } catch (error) {
        // エラーハンドリング
        console.error('Error invoking Lambda B:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error invoking Lambda B',
                error: error.message
            })
        };
    }
};
