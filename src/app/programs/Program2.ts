import {Program} from './program';
import {RobotService} from '../services/robot.service';
import {Observable} from 'rxjs';
import {Pose, Position} from '../model';

export class Program2 implements Program {
  private static INITIAL_ROLL = - Math.PI / 4;
  private static INITIAL_PITCH = Math.PI / 2;
  private static INITIAL_YAW = - Math.PI / 4 - 0.01;
  private static INITIAL_X = 0.3;
  private static INITIAL_Y = 0.115;
  private static INITIAL_Z = -0.31;

  private static TAKE_X = 0.3;
  private static TAKE_Y = 0.115;
  private static TAKE_Z = -0.31;
  private static TAKE_ROLL = - Math.PI / 4;
  private static TAKE_PITCH = Math.PI / 2;
  private static TAKE_YAW = - Math.PI / 4 - 0.01;

  private static SPEED = 300;

  private static HOME_POSE: Pose = {a1: 0, a2: 90, a3: 0, a4: -90, a5: 90, a6: 0};
  private static HOME: Position = {x:0.027305309361239316,y:0.08149639068657356,z:0.8884717275149439, roll:-0.12697279453277588,pitch:1.5707080364227295,yaw:1.6977672576904297};
  private static BEFORE_HOME: Position = {x: 0.49, y: 0.53, z: 0.72, roll: 1.5707893371582031, pitch: 0.5760120749473572, yaw: -0.9601222276687622};

  private static BEFORE_6 = {x:0.7326028706121241,y:0.5138693386044813,z:0.6482596496122165, roll:1.5708247423171997,pitch:0.26176273822784424,yaw:-1.6584539413452148};
  private static BEFORE_5 = {x:0.6999806859386853,y:0.13496042190050736,z:0.12994753279288435, roll:-1.0855990648269653,pitch:0.5709368586540222,yaw:-0.7952250242233276};
  private static BEFORE_4 = {x:0.6499521204012888,y:0.11498020772913073,z:-0.010042814797695393, roll:-0.7855545878410339,pitch:0.9709660410881042,yaw:-0.7952607870101929};
  private static BEFORE_3 = {x:0.49995924380240325,y:0.11502874491760792,z:-0.16001955422957148, roll:-0.7856265306472778,pitch:1.3708958625793457,yaw:-0.7951730489730835};
  private static BEFORE_2 = {x:0.3499944201113013,y:0.11503640229013261,z:-0.21000763619716456, roll:2.1121585369110107,pitch:1.570756196975708,yaw:2.5902554988861084};
  private static BEFORE_1 = {x:0.34997829089280746,y:0.11500773038544511,z:-0.3100048852658574, roll:-2.4312047958374023,pitch:1.5707383155822754,yaw:0.8504190444946289};


  private static TAKE_1: Position = { x: Program2.TAKE_X, y: Program2.TAKE_Y, z: Program2.TAKE_Z, roll: 1.9011156558990479, pitch: 1.5706969499588013, yaw: 2.8012726306915283};

  private static LIFT_1: Position = { x: Program2.TAKE_X, y: Program2.TAKE_Y, z: Program2.TAKE_Z + 0.05, roll: 1.116859793663025, pitch: 1.5706517696380615, yaw: -2.6976568698883057};

  private static INTERMEDIATE_1: Position = {x:0.4499705336047264,y:0.11503206709716879,z:-0.11001107507392856, roll:3.0421082973480225,pitch:1.570691704750061,yaw:1.66029953956604};
  private static INTERMEDIATE_2: Position = {x:0.499946032201325,y:0.3149745918064969,z:-0.010036289531137188,roll:-2.7537877559661865,pitch:1.5705703496932983,yaw:1.1728965044021606};
  private static INTERMEDIATE_3: Position = {x:0.49999004779663875,y:0.41498154651814034,z:0.0899586982148918,roll:2.768613815307617,pitch:1.57063627243042,yaw:1.9336633682250977};
  private static INTERMEDIATE_4: Position = {x:0.44999987541629266,y:0.41499526673286397,z:0.12996045482046442,roll:2.496656656265259,pitch:1.5706204175949097,yaw:2.2056233882904053};
  private static INTERMEDIATE_5: Position = {x:0.24993082839430064,y:0.41491869516644486,z:0.1299485558973838,roll:2.210239887237549,pitch:1.5705748796463013,yaw:2.4518449306488037};


  private static AFTER_1: Position = {x:0.29001069995234174,y:0.41500719780495215,z:0.12998082853881338, roll:1.9199551343917847,pitch:1.570696234703064,yaw:2.742375135421753};
  private static AFTER_2: Position = {x:0.34998373455590753,y:0.41500608277437345,z:0.1299823095658358, roll:2.843646764755249,pitch:1.5707210302352905,yaw:1.8186396360397339};


  run(service: RobotService): Observable<any> {
    return service.openGripper().flatMap(() =>
      service.setPose(Program2.HOME_POSE, Program2.SPEED)
    ).flatMap(() =>
      service.runPositions([
        Program2.BEFORE_6, Program2.BEFORE_5, Program2.BEFORE_4, Program2.BEFORE_3, Program2.BEFORE_2, Program2.BEFORE_1
      ], Program2.SPEED)
    ).flatMap(() =>
      service.openGripper()
    ).flatMap(() =>
      service.setPosition(Program2.TAKE_1, Program2.SPEED)
    ).flatMap(() =>
      service.closeGripper()
    ).flatMap(() =>
      service.setPosition(Program2.LIFT_1, Program2.SPEED)
    ).flatMap(() =>
      service.runPositions([
        Program2.INTERMEDIATE_1, Program2.INTERMEDIATE_2, Program2.INTERMEDIATE_3, Program2.INTERMEDIATE_4, Program2.INTERMEDIATE_5
      ], Program2.SPEED)
    ).flatMap(() =>
      service.openGripper()
    ).flatMap(() =>
      service.runPositions([ Program2.AFTER_1, Program2.AFTER_2, Program2.BEFORE_HOME, Program2.HOME], Program2.SPEED)
    );
  }

}
