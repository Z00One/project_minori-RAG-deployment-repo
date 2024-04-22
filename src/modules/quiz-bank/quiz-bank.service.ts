import { Injectable } from '@nestjs/common';
import { QuizBankRepository } from './quiz-bank.repository';
import { QuizContent } from '@modules/quiz/dto/create-update.dto';
import { QuizEntity } from '@modules/quiz/entity/quiz.entity';

@Injectable()
export class QuizBankService {
  constructor(
    private readonly quizBankRepository: QuizBankRepository,
  ) {}

  /**
   * クイズバンクを取得
   * @param id - クイズバンクID
   * @returns - クイズバンク
   */
  async get(id: bigint) {
    const data = await this.quizBankRepository.find(id);
    return new QuizEntity({
      id: data.id,
      content: data.content,
    });
  }

  /**
   * クイズバンク一覧を取得
   * @param c_id - クラスID
   * @param u_id - ユーザーID
   * @param page - ページ番号
   * @param limit - 1ページあたりのアイテム数
   * @returns - クイズバンク一覧
   */
  async getMany(
    c_id: bigint,
    u_id: bigint,
    page: number,
    limit: number,
  ) {
    const data = await this.quizBankRepository.findMany(
      c_id,
      u_id,
      page,
      limit,
    );

    return data.map(
      (quiz) =>
        new QuizEntity({
          id: quiz.id,
          content: quiz.content,
        }),
    );
  }

  /**
   * クイズバンクを検索
   * @param c_id - クラスID
   * @param u_id - ユーザーID
   * @param page - ページ番号
   * @param limit - 1ページあたりのアイテム数
   * @param keyword - キーワード
   * @returns - クイズバンク
   */
  async search(
    c_id: bigint,
    u_id: bigint,
    page: number,
    limit: number,
    keyword: string,
  ) {
    const data = await this.quizBankRepository.search(
      c_id,
      u_id,
      page,
      limit,
      keyword,
    );

    return data.map(
      (quiz) =>
        new QuizEntity({
          id: quiz.id,
          content: quiz.content,
        }),
    );
  }

  /**
   * クイズバンクを作成
   * @param c_id - クラスID
   * @param u_id - ユーザーID
   * @param content - クイズの内容
   * @returns - クイズバンク作成成功メッセージ
   */
  async create(
    c_id: bigint,
    u_id: bigint,
    content: QuizContent,
  ) {
    await this.quizBankRepository.create(
      c_id,
      u_id,
      content.question,
      JSON.stringify(content),
    );
    return 'Quiz Bank created successfully';
  }

  /**
   * クイズバンクを更新
   * @param id - クイズバンクID
   * @param content - クイズの内容
   * @returns - クイズバンク更新成功メッセージ
   */
  async update(id: bigint, content: QuizContent) {
    await this.quizBankRepository.update(
      id,
      content.question,
      JSON.stringify(content),
    );
    return 'Quiz Bank updated successfully';
  }

  /**
   * クイズバンクを削除
   * @param id - クイズバンクID
   * @returns - void
   */
  remove(id: bigint) {
    return this.quizBankRepository.remove(id);
  }
}
